import client from './base';

type PutUserPayload = {
  name: string;
  sessionId: string;
};

export type User = {name: string; id: string};

export const putUser = (payload: PutUserPayload) =>
  client.put<User>('/user', payload);
