import { LocalStorage } from "../util/local-storage";

const localUserIdStorage = new LocalStorage<string>("userId");

export const storeUserId = async (userId: string) => {
  console.log("storeUserId", userId);
  await localUserIdStorage.setItem(userId);
  return userId;
};

export const getUserIdFromStore = async () => {
  console.log("getUserIdFromStore");
  return await localUserIdStorage.getItem();
};
