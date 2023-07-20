import { useNavigate } from 'react-router-dom';
import useToken from '~/app/hooks/useToken';
import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HOME_PATH } from '~/app/routes/paths';

const withAuthentication = (Component: React.ComponentType<any>) => {
  const WithAuthenticationComponent = (props: any) => {
    const [isAuthChecked, setAuthChecked] = useState(false);
    const isAuthenticated = useToken();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated !== null) {
        setAuthChecked(true);
        if (!isAuthenticated) {
          navigate(HOME_PATH);
        }
      }
    }, [isAuthenticated, navigate]);

    if (isAuthChecked && isAuthenticated) {
      return <Component {...props} />;
    }

    return null;
  };

  return WithAuthenticationComponent;
};

export default withAuthentication;
