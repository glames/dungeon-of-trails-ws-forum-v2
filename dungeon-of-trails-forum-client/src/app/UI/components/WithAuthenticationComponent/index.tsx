import { useNavigate } from 'react-router-dom';
import useToken from '~/app/hooks/useToken';
import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './withAuth.module.scss';
import { HOME_PATH } from '~/app/routes/paths';

const withAuthentication = (Component: React.ComponentType<any>) => {
  const WithAuthenticationComponent = (props: any) => {
    const [isAuthChecked, setAuthChecked] = useState(false);
    const isAuthenticated = useToken();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated !== null) {
        setAuthChecked(true);
        // if (!isAuthenticated) {
        //   navigate(HOME_PATH);
        // }
      }
    }, [isAuthenticated, navigate]);

    if (isAuthChecked && isAuthenticated) {
      return <Component {...props} />;
    } else {
      return (
        <>
          <div className={styles.pageCont}>
            <img
              src="/assets/images/stop.svg"
              alt="You are not authorized to access this page"
            />
            <br />
            <h2>You are not authorized to access this page </h2>
          </div>
        </>
      );
    }

    return null;
  };

  return WithAuthenticationComponent;
};

export default withAuthentication;
