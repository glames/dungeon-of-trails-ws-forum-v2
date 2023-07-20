import { ToastContainer } from 'react-toastify';

import TapTop from './TapTop';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ProtectedRoute from '~/app/UI/components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '~/app/redux-tk/store';
import { useAppDispatch } from '~/app/redux-tk/store/hooks';
import { setTokenForUser } from '~/app/redux-tk/slices/auth.slice';
import { getAccessToken } from '~/app/utils/local-storage';

type MainLayoutProps = {
  children: JSX.Element;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();
  dispatch(
    setTokenForUser({
      accessToken: getAccessToken(),
      refreshToken: "",
    })
  );
  
  return (
    <>
      {/* // <ProtectedRoute> */}
      <TapTop />
      <div
        className='page-wrapper compact-wrapper'
        id='pageWrapper'
      >
        <Header />
        <div className='page-body-wrapper'>
          <Sidebar />
          <div className='page-body'>{children}</div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
      {/* // </ProtectedRoute> */}
    </>
  );
};

export default MainLayout;
