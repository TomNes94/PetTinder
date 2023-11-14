import client from './base';
import {ListOfLikes} from './likes';
import {User} from './user';

export const createSession = ({
  code,
  animalType,
  gender,
}: {
  code: string;
  animalType: 'cat' | 'dog';
  gender: 'male' | 'female';
}) =>
  client.post<{
    id: string;
    code: string;
  }>('/', {code, animalType, gender});

export type Session = {
  id: string;
  code: string;
  gender: string;
  animalType: string;
  users: {
    requester: User;
    addressee?: User;
  };
  likes: ListOfLikes;
};

export const getSessionByCode = (code: string) =>
  client.get<Session>(`/code/${code}`);
export const getSessionById = (id: string) => client.get<Session>(`/${id}`);
