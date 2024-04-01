import * as dynamo from "@aws-sdk/client-dynamodb";
import { createLogger } from "utils/logger";

const dynamoClient = process.env.AWS_SAM_LOCAL
  ? new dynamo.DynamoDBClient({
      endpoint: "http://host.docker.internal:8000",
    })
  : new dynamo.DynamoDBClient();
createLogger("dynamo.client").info("DynamoDB client created");
createLogger("dynamo.client").info(process.env.AWS_SAM_LOCAL);
export default dynamoClient;
