import client from "./base";

interface PutUserPayload {
  name: string;
  sessionId: string;
}

export interface User {
  name: string;
  id: string;
}

export const putUser = async (payload: PutUserPayload) => await client.put<User>("/user", payload);
