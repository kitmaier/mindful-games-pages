import json
import pymysql

# TODO: get rid of these plaintext passwords
rds_host  = "database-2.cctstixwotos.us-west-2.rds.amazonaws.com"
name = "admin"
password = "Administrator1!"
db_name = "testdb"

conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)

# CORS support should be enabled in the API Gateway as well (https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

def lambda_handler(event, context):
    # TODO implement
    params = event.get("queryStringParameters",None)
    value = {"event":event,"version":3,"params":params}
    with conn.cursor() as cur:
        cur.execute('insert into table1(valcol) values(%s)',("params:"+json.dumps(params)))
        conn.commit()
        cur.execute("select count(*) cnt from table1")
        for row in cur:
            value["rowcount_data"] = row
    return {
        'statusCode': 200,
        'body': json.dumps(value),
        'headers': {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        }
    }

