import LocalStorageService from '../services/localStorageService';

import { StorageKeys } from '../services/enum';
import { LoginResponseData } from '../services/auth/authServiceTypes';

export default function setNewTokens(
  accessToken: string,
  refreshToken: string
) {
  const userData = LocalStorageService.getParsedItem<LoginResponseData>(
    StorageKeys.USER_DATA
  );
  userData.token = accessToken;
  userData.refreshToken = refreshToken;
  LocalStorageService.setItemToStorage<LoginResponseData>(
    StorageKeys.USER_DATA,
    userData
  );
}
