import { DynamoDBService } from "../dynamo/dynamo.service";

interface CreateSessionPayload {
  id: string;
  code: string;
  animalType: string;
  gender: string;
}

export class SessionRepository {
  constructor(private readonly dynamoService: DynamoDBService) {}

  async getSessionByCode(code: string) {
    const sessionQuery = await this.dynamoService.query({
      TableName: "Session",
      IndexName: "CodeIndex",
      KeyConditionExpression: "Code = :code",
      ExpressionAttributeValues: {
        ":code": {
          S: code,
        },
      },
      Limit: 1,
    });

    return sessionQuery.Items?.[0];
  }

  async getSessionById(id: string) {
    const sessionQuery = await this.dynamoService.query({
      TableName: "Session",
      KeyConditionExpression: "Id = :id AND #t=:t",
      ExpressionAttributeValues: {
        ":id": {
          S: id,
        },
        ":t": {
          S: "Session",
        },
      },
      ExpressionAttributeNames: {
        "#t": "Type",
      },
      Limit: 1,
    });

    return sessionQuery.Items?.[0];
  }

  async createSession(createSessionPayload: CreateSessionPayload) {
    const { id, gender, animalType, code } = createSessionPayload;
    await this.dynamoService.put({
      table: "Session",
      key: { Id: { S: id }, Type: { S: "Session" } },
      expressionAttributeValues: {
        ":val": { S: code },
        ":at": { S: animalType },
        ":g": { S: gender },
      },
      updateExpression: "SET #c=:val, #at=:at, #g=:g",
      expressionAttributeNames: {
        "#c": "Code",
        "#at": "AnimalType",
        "#g": "Gender",
      },
    });
  }

  async addUserToSession(
    userId: string,
    sessionId: string,
    isRequester: boolean
  ) {
    await this.dynamoService.put({
      table: "Session",
      key: { Id: { S: sessionId }, Type: { S: "Session" } },
      expressionAttributeValues: {
        ":r": { S: userId },
      },
      updateExpression: "SET #r=:r",
      expressionAttributeNames: {
        "#r": isRequester ? "RequesterId" : "AddresseeId",
      },
    });
  }
}

export const sessionRepository = new SessionRepository(
  DynamoDBService.getInstance()
);
