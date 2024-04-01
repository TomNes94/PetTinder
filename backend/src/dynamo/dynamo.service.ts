import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import dynamoClient from "./client";

export class DynamoDBService {
  constructor(private readonly dynamo: DynamoDBClient) {}

  static getInstance() {
    return new DynamoDBService(dynamoClient);
  }

  put({
    table,
    updateExpression,
    key,
    expressionAttributeValues,
    expressionAttributeNames,
  }: {
    table: string;
    key: Record<string, AttributeValue>;
    updateExpression?: string;
    expressionAttributeValues?: Record<string, AttributeValue>;
    expressionAttributeNames?: Record<string, string>;
  }) {
    const command = new UpdateItemCommand({
      TableName: table,
      Key: key,
      UpdateExpression: updateExpression,
      ReturnValues: "ALL_NEW",
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return this.dynamo.send(command);
  }

  query(input: QueryCommandInput) {
    const command = new QueryCommand(input);

    return this.dynamo.send(command);
  }
}
