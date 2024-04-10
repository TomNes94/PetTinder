import { LocalStorage } from "../util/local-storage";

const localCodeStorage = new LocalStorage<string>("code");

export const storeCode = async (code: string) => {
  console.log("storeCode", code);
  await localCodeStorage.setItem(code);
  return code;
};

export const getCodeFromStore = async () => {
  console.log("getCodeFromStore");
  return await localCodeStorage.getItem();
};
