import { DynamoDBService } from "../dynamo/dynamo.service";

export class LikeRepository {
  constructor(private readonly dynamoService: DynamoDBService) {}

  async getLikeList(sessionId: string) {
    const queryResult = await this.dynamoService.query({
      ExpressionAttributeValues: {
        ":id": {
          S: sessionId,
        },
        ":t": {
          S: "Like",
        },
      },
      ExpressionAttributeNames: { "#t": "Type" },
      KeyConditionExpression: "Id = :id AND #t = :t",
      TableName: "Session",
    });

    return (queryResult.Items ?? []).map((like) => ({
      requesterLike: like.RequesterLike?.BOOL ?? null,
      addresseeLike: like.AddresseeLike?.BOOL ?? null,
      name: like.Name.S,
    }));
  }

  async setLike(
    session: { id: string; requesterId: string | null },
    like: boolean,
    userId: string,
    name: string
  ) {
    const isRequester = session.requesterId === userId;
    const Like = isRequester
      ? {
          RequesterLike: {
            BOOL: like,
          },
        }
      : {
          AddresseeLike: {
            BOOL: like,
          },
        };

    await this.dynamoService.put({
      table: "Session",
      key: {
        Id: {
          S: session.id,
        },
        Type: {
          S: "Like",
        },
      },
      expressionAttributeNames: { "#n": "Name" },
      expressionAttributeValues: {
        ":n": { S: name },
        ":l": {
          BOOL: Like.RequesterLike
            ? Like.RequesterLike.BOOL
            : Like.AddresseeLike.BOOL,
        },
      },
      updateExpression: `SET ${
        isRequester ? "RequesterLike" : "AddresseeLike"
      } = :l, #n = :n`,
    });
  }
}

export const likeRepository = new LikeRepository(DynamoDBService.getInstance());
