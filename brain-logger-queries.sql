
/* create table in athena to support queries on s3 for a single session*/

CREATE EXTERNAL TABLE IF NOT EXISTS table48895411585313275 (
  appname string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  recorddate string,
  startquiet string,
  startnote string,
  endnote string,
  notetext string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://generic-use/generic-logging/brainlogger/48895411585313275/';

/* select all data for a session */

select * from table48895411585313275 order by cast(sequence as bigint);

/* create table in athena to support queries on s3 for all sessions */

CREATE EXTERNAL TABLE IF NOT EXISTS brainloggertable (
  appname string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  recorddate string,
  startquiet string,
  startnote string,
  endnote string,
  notetext string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://generic-use/generic-logging/brainlogger/';

/* select all data for a session */

select * from brainloggertable order by cast(timestamp as bigint);
