import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorage<T> {
  constructor(private readonly key: string) {}
  async setItem(value: T) {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  async getItem() {
    try {
      const value = await AsyncStorage.getItem(this.key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error(error);
    }
  }

  async removeItem() {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error(error);
    }
  }
}
