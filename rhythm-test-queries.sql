
/* create table in athena to support queries on s3 for a single session*/

CREATE EXTERNAL TABLE IF NOT EXISTS table6722611761116779 (
  appname string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  duration string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://generic-use/generic-logging/rhythmtest/6722611761116779/';



/* create table in athena to support queries on s3 for all sessions */

CREATE EXTERNAL TABLE IF NOT EXISTS rhythmtesttable (
  appname string,
  ip string,
  session string,
  sequence string,
  timestamp string,
  duration string
) 
ROW FORMAT serde 'org.apache.hive.hcatalog.data.JsonSerDe'
LOCATION 's3://generic-use/generic-logging/rhythmtest/';


