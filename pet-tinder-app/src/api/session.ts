import client from "./base";
import { type ListOfLikes } from "./likes";
import { type User } from "./user";
import { type AnimalType, type Gender } from "../gallery/swipe.constant";

export const createSession = async ({
  code,
  animalType,
  gender,
}: {
  code: string;
  animalType: AnimalType;
  gender: Gender;
}) =>
  await client.post<{
    id: string;
    code: string;
  }>("/", { code, animalType, gender });

export interface Session {
  id: string;
  code: string;
  gender: Gender;
  animalType: AnimalType;
  users: {
    requester: User;
    addressee?: User;
  };
  likes: ListOfLikes;
}

export const getSessionByCode = async (code: string) => await client.get<Session>(`/code/${code}`);
export const getSessionById = async (id: string) => await client.get<Session>(`/${id}`);
