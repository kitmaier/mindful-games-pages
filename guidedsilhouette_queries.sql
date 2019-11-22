/* display start/pause/stop events in sequence order */

select sequence as seq, 
	from_unixtime(floor(epoch/1000)-8*60*60) as dt_ts, 
	epoch, eventName, valcol 
	from (
		select SUBSTR(valcol,LOCATE('"timestamp":',valcol)+14,13) as epoch, 
		SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('startGame',valcol)+LOCATE('pauseGame',valcol)+LOCATE('stopGame',valcol),15),'\\',1) as eventName, 
		SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('sequence',valcol)+12,5),'"',1) as sequence, 
		keycol, valcol 
		from testdb.table1 
		where valcol like '%"game": "guidedsilhouette"%' 
			and (valcol like '%startGame%' or valcol like '%pauseGame%' or valcol like '%stopGame%')
	) z where epoch > 1574063463662 order by epoch;



/* display start and end time of each session */

select session_id, 
	from_unixtime(floor(min_epoch/1000)-8*60*60) as min_dt_ts, 
	from_unixtime(floor(max_epoch/1000)-8*60*60) as max_dt_ts, 
	min_epoch,
	max_epoch,
	(max_epoch-min_epoch)/(60*1000) as duration_mm
	from (
		select session_id, max(epoch) max_epoch, min(epoch) min_epoch, min(keycol) min_keycol from (
			select SUBSTR(valcol,LOCATE('"timestamp":',valcol)+14,13) as epoch, 
			SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('session',valcol)+11,20),'"',1) as session_id, 
			keycol
			from testdb.table1 
			where valcol like '%"game": "guidedsilhouette"%' 
		) z group by session_id
	) zz
where max_epoch-min_epoch > 2*60*1000
order by min_keycol;



/* verify that no events have been dropped */
/* TODO: switch to grouping by session_id to handle concurrent sessions */

select * from (
	select min(ts) as start_ts, 
		session_id, 
		1+max(keycol)-min(keycol) row_cnt, 
		count(*) expected_row_cnt 
	from (
		select SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('session',valcol)+11,30),'"',1) as session_id, 
			SUBSTR(valcol,LOCATE('"timestamp":',valcol)+14,13) as ts, 
			keycol, valcol 
		from testdb.table1
	) z group by session_id
) zz where row_cnt != expected_row_cnt order by start_ts;



/* query to generate body scan durations report */
/* TODO: replace four-minute heuristic with half the time since prior start event */

SET @session_id = "%0.7564837189602414%";
SET @quot1 = 'initialValue';
SET @quot2 = -100;
SET @quot3 = 0;
select floor((sum(duration_mm)+4*count(*))/60) total_duration_body_scan_hh, 
	floor(sum(duration_mm)+4*count(*)-60*floor((sum(duration_mm)+4*count(*))/60)) total_duration_body_scan_mm from (
select from_unixtime(floor(lag_curr_epoch/1000)-8*60*60) as dt_ts_start, from_unixtime(floor(lag_epoch/1000)-8*60*60) as dt_ts_stop, (lag_epoch-lag_curr_epoch)/(60*1000) duration_mm from (
select sequence, lag_epoch, @quot3 lag_curr_epoch, @quot3:=curr_epoch from (
select sequence, @quot1 lag_event_name, @quot1:=event_name curr_event_name, @quot2 lag_epoch, @quot2:=epoch curr_epoch from (
	select SUBSTR(valcol,LOCATE('"timestamp":',valcol)+14,13) as epoch, 
		SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('startGame',valcol)+LOCATE('pauseGame',valcol)+LOCATE('stopGame',valcol),15),'\\',1) as event_name, 
		cast(SUBSTRING_INDEX(SUBSTR(valcol,LOCATE('sequence',valcol)+12,5),'"',1) as SIGNED) as sequence
	from testdb.table1 
	where valcol like '%"game": "guidedsilhouette"%' 
		and (valcol like '%startGame%' or valcol like '%pauseGame%' or valcol like '%stopGame%')
		and valcol like @session_id
	union all select 0, "begin", -1 from dual
	union all select 9999999999999, "end", 1000000 from dual
) base order by sequence ) base2 where lag_event_name in ('begin','stopGame') order by sequence) base3 where lag_epoch > 0 order by sequence) base4
;



/* get MYSQL version */

SHOW VARIABLES LIKE "%version%";
