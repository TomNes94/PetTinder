import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./client";

export const query = (input: QueryCommandInput) => {
  const command = new QueryCommand(input);

  return dynamoClient.send(command);
};
