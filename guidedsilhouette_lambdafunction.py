import json
import boto3
import io

# CORS support should be enabled in the API Gateway as well (https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

def lambda_handler(event, context):
    # TODO: default value is a bit fragile, and missing values might impact downstream logic
    params = event.get("queryStringParameters",{"session":"0.0","sequence":"0"})
    jsonFileName = params["session"][2:]+"/"+params["sequence"]+".json"
    jsonFile = io.BytesIO(json.dumps(params).encode('utf-8'))
    bucketName = 'guidedsilhouette-eventlog'
    aclObject = {'ACL': 'public-read'} # TODO: set up a better per-file ACL
    s3client = boto3.client('s3')
    s3client.upload_fileobj(jsonFile,bucketName,jsonFileName,ExtraArgs=aclObject)
    # TODO: reply with count of objects in bucket for troubleshooting
    value = {"event":event,"version":3,"params":params}
    # TODO: send better response
    return {
        'statusCode': 200,
        'body': json.dumps(value),
        'headers': {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        }
    }
