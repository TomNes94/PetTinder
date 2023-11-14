import { AttributeValue, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./client";

export const put = ({
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
}) => {
  const command = new UpdateItemCommand({
    TableName: table,
    Key: key,
    UpdateExpression: updateExpression,
    ReturnValues: "ALL_NEW",
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  });

  return dynamoClient.send(command);
};
