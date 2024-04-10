import { LocalStorage } from "../util/local-storage";

const localSessionIdStorage = new LocalStorage<string>("sessionId");

export const storeSessionId = async (sessionId: string) => {
  console.log("storeSessionId", sessionId);
  await localSessionIdStorage.setItem(sessionId);
  return sessionId;
};

export const getSessionIdFromStore = async () => {
  console.log("getSessionIdFromStore");
  return await localSessionIdStorage.getItem();
};
