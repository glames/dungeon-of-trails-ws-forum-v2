import { Navigate } from 'react-router';

import { HOME_PATH } from '~/app/routes/paths';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { defaultConfig } from '~/app/utils/toast.config';
import useToken from '~/app/hooks/useToken';
import { inspect } from 'util';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isValidForAccess = true;
  return (
    <>{isValidForAccess ? children : <Navigate to={HOME_PATH} replace />}</>
  );
};

export default ProtectedRoute;
