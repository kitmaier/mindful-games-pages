import json
import boto3
import io
import random

# CORS support should be enabled in the API Gateway as well (https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

def lambda_handler(event, context):
    # TODO: verify price of pushing data to S3 in this way, and consider more efficient ways to implement this
    # TODO: default value is a bit fragile, and missing values might impact downstream logic
    params = event.get("queryStringParameters",{"session":"0.0","sequence":"0"})
    # TODO: have the browser include the session-start-date as a parameter to help partitioning
    jsonFileName = "brainlogger/"+params["session"][2:]+"/"+params["sequence"]+".json"
    jsonFile = io.BytesIO(json.dumps(params).encode('utf-8'))
    bucketName = 'generic-use'
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

# Notes on how to set up this function:
# In S3 create a bucket and folder in the Oregon region with the chosen names and public access
# In Lambda create a new function in the Oregon region as "Author from scratch" with the most recent Python runtime
# In the configuration designer hit "Add trigger", select "API Gateway", "Create a new API", "REST API", Open security
# Grab the url of the API endpoint, this is what the browser will need to hit
# In the configuration designer select the lambda function and copy the above code into the editor and hit Save
# In the configuration designer in the Execution Role section click on "View the ----- role in the IAM console" link
# Click "Attach policies" search for S3 and check the box next to AmazonS3FullAccess and hit "Attach policy"
# In the configuration designer hit Test, create a new dummy test, and then run it
