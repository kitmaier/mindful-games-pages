
/* create table in athena to support queries on s3 */

CREATE EXTERNAL TABLE IF NOT EXISTS table1 (
  game string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  data string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://guidedsilhouette-eventlog/';



/* create table in athena to support queries on s3 for a single session*/

CREATE EXTERNAL TABLE IF NOT EXISTS table9765362326599145 (
  game string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  data string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://guidedsilhouette-eventlog/9765362326599145/';



/* display start/pause/stop events in sequence order */

select 
	from_unixtime(floor(epoch/1000)-8*60*60) as dt_ts, 
	epoch, session, sequence, eventName, data 
from (
	select *,
		cast(timestamp as bigint) epoch, 
		regexp_extract(data,'start|pause|stop') eventName
	from table1 
	where regexp_like(data,'start|pause|stop')
) 
where epoch > 0 order by epoch;



/* display start and end time of each session */

select session, 
	from_unixtime(floor(min_epoch/1000)-8*60*60) as min_dt_ts, 
	from_unixtime(floor(max_epoch/1000)-8*60*60) as max_dt_ts, 
	min_epoch,
	max_epoch,
	(max_epoch-min_epoch)/(60*1000) as duration_mm
from (
	select session, max(epoch) max_epoch, min(epoch) min_epoch from (
		select session, cast(timestamp as bigint) as epoch from table1 
	) group by session
)
where max_epoch-min_epoch > 2*60*1000
order by min_epoch desc;



/* verify that no events have been dropped */

select * from (
	select min(epoch) as start_ts, 
		session, 
		1+max(seq)-min(seq) expected_row_cnt, 
		count(*) row_cnt 
	from (
		select session, cast(sequence as bigint) as seq, cast(timestamp as bigint) as epoch from table1
	) group by session
) where row_cnt != expected_row_cnt order by start_ts;



/* query to generate body scan durations report */
/* TODO: replace four-minute heuristic with half the time since prior start event */
/* TODO: include sleep timings side-by-side with scan timings */
/* TODO: include a count of events (start/scan/pause) in each segment of time */

select floor((sum(duration_mm)-4*count(*))/60) total_duration_body_scan_hh, 
	floor(sum(duration_mm)-4*count(*)-60*floor((sum(duration_mm)-4*count(*))/60)) total_duration_body_scan_mm,
	floor((sum(stopped_mm)+4*count(*))/60) total_duration_body_scan_hh, 
	floor(sum(stopped_mm)+4*count(*)-60*floor((sum(stopped_mm)+4*count(*))/60)) total_duration_stopped_mm
from (
select from_unixtime(floor(lag_curr_epoch/1000)-8*60*60) as dt_ts_start, 
		from_unixtime(floor(lag_epoch/1000)-8*60*60) as dt_ts_stop, 
		round((lag_epoch-lag_curr_epoch)/(60.0*1000),2) duration_mm,
		round((curr_epoch-lag_epoch)/(60.0*1000),2) stopped_mm
from (
select seq, lag_epoch, 
		lag(curr_epoch,1,-200) OVER (ORDER BY seq) as lag_curr_epoch,
		case when curr_epoch=9999999999999 then lag_epoch else curr_epoch end as curr_epoch
from (
select * from (
select seq, 
		lag(event_name,1,'initialValue') OVER (ORDER BY seq) as lag_event_name, event_name as curr_event_name, 
		lag(epoch,1,-100) OVER (ORDER BY seq) as lag_epoch, epoch as curr_epoch
from ( select 
		cast(timestamp as bigint) as epoch,
		regexp_extract(data,'start|pause|stop') as event_name, 
		cast(sequence as bigint) as seq
	from table11621708259720331
	where regexp_like(data,'start|pause|stop')
	union all select 0, 'begin', -1
	union all select 9999999999999, 'end', 1000000
) ) where lag_event_name in ('begin','stop') 
) ) where lag_curr_epoch > 0 order by seq
);


