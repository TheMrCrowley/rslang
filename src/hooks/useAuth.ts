import useTypedSelector from './useTypedSelector';

const useAuth = () => {
  const authState = useTypedSelector(store => store.auth);
  const { isAuth } = authState;
  const { userId } = authState.userData;
  return {
    isAuth,
    userId,
  };
};

export default useAuth;
