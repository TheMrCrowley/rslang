const TOKEN_LOCAL_STORAGE_KEY = 'access-token';
export default function getAccessToken() {
  return (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) as string).replace(
    /"/g,
    ''
  );
}
