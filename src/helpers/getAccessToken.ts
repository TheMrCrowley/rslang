import LocalStorageService from '../services/localStorageService';

import { StorageKeys } from '../services/enum';
import { LoginResponseData } from '../services/auth/authServiceTypes';

export default function getAccessToken() {
  const token = LocalStorageService.hasItem(StorageKeys.USER_DATA)
    ? LocalStorageService.getParsedItem<LoginResponseData>(
        StorageKeys.USER_DATA
      ).token
    : ' ';
  return token.replace(/"/g, '');
}
