import * as dynamo from "@aws-sdk/client-dynamodb";

const dynamoClient = process.env.AWS_SAM_LOCAL
  ? new dynamo.DynamoDBClient({
      endpoint: "http://host.docker.internal:8000",
    })
  : new dynamo.DynamoDBClient();

export default dynamoClient;
