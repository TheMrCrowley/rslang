import LocalStorageService from '../services/localStorageService';

import { StorageKeys } from '../services/enum';
import { LoginResponseData } from '../services/auth/authServiceTypes';

export default function getRefreshToken() {
  const { refreshToken } = LocalStorageService.getParsedItem<LoginResponseData>(
    StorageKeys.USER_DATA
  );
  return refreshToken.replace(/"/g, '');
}
