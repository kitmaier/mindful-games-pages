import json
import boto3
import io
import random

# CORS support should be enabled in the API Gateway as well (https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html)

def lambda_handler(event, context):
    # TODO: verify that pulling data from S3 in this way is free, and consider more efficient ways to implement this
    params = event.get("queryStringParameters",{"words":"7"})
    sentenceLength = params["words"]
    s3client = boto3.client('s3')
    bucketName = 'generic-use'
    objectName = 'mantraguide/sentences.json'
    with open('/tmp/sentences.json', 'wb') as f:
        s3client.download_fileobj(bucketName, objectName, f)
    with open('/tmp/sentences.json', 'r') as f:
        sentencesString = f.read()
    sentencesJson = json.loads(sentencesString)
    sentencesList = sentencesJson[sentenceLength]
    sentenceIndex = random.randint(0,len(sentencesList))
    sentence = sentencesList[sentenceIndex]
    return {
        'statusCode': 200,
        'body': sentence,
        'headers': {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
        }
    }
