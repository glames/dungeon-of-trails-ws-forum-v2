import { useEffect, useState } from 'react';
import { useSignInWithTokenQuery } from '../api-interaction/GraphQL/schema';
import { inspect } from 'util';
import { getAccessToken } from '../utils/local-storage';

const useToken = () => {
  const [isValid, setIsValid] = useState(false);
  const [isQueryComplete, setIsQueryComplete] = useState(false);

  const { data, error } = useSignInWithTokenQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data !== undefined) {
      if (data?.SignInWithToken) {
        setIsValid(true);
      }
      setIsQueryComplete(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsQueryComplete(true);
    }
  }, [error]);

  if (!isQueryComplete) {
    return null;
  }

  return isValid;
};

export default useToken;
