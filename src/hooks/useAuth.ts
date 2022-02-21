import useTypedSelector from './useTypedSelector';

const useAuth = () => {
  const authState = useTypedSelector(store => store.auth);
  const { isAuth } = authState;
  const { userId } = authState.userData;
  const { request } = authState;
  return {
    isAuth,
    userId,
    request,
  };
};

export default useAuth;
