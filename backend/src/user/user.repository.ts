import { DynamoDBService } from "../dynamo/dynamo.service";

interface CreateUserPayload {
  id: string;
  name: string;
}

export class UserRepository {
  constructor(private readonly dynamoService: DynamoDBService) {}

  async getUserById(id: string) {
    const userQuery = await this.dynamoService.query({
      TableName: "Session",
      KeyConditionExpression: "#id=:id AND #t=:t",
      ExpressionAttributeValues: {
        ":id": {
          S: id,
        },
        ":t": {
          S: "User",
        },
      },
      ExpressionAttributeNames: {
        "#t": "Type",
        "#id": "Id",
      },
      Limit: 1,
    });

    return userQuery.Items?.[0];
  }

  async createUser(createUserPayload: CreateUserPayload) {
    const { id, name } = createUserPayload;
    await this.dynamoService.put({
      table: "Session",
      expressionAttributeValues: { ":val": { S: name } },
      key: { Id: { S: id }, Type: { S: "User" } },
      updateExpression: `SET #n=:val`,
      expressionAttributeNames: { "#n": "Name" },
    });
  }
}

export const userRepository = new UserRepository(DynamoDBService.getInstance());
