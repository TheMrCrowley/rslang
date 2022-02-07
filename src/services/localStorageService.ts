export default class LocalStorageService {
  static getParsedItem = <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key) as string) as T;
  };

  static setItemToStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static hasItem = (key: string): boolean => {
    return !!localStorage.getItem(key);
  };

  static remove = (key: string): void => {
    localStorage.removeItem(key);
  };
}
