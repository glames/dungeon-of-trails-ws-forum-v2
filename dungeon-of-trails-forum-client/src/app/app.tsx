import { Provider } from 'react-redux';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fetch from 'cross-fetch';

import { RouteType, publicRoutes, privateRoutes } from './routes';
import MainLayout from './UI/layouts/MainLayout';
import Loader from './UI/components/Loader';
import { store } from './redux-tk/store';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeAllUserInfo,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './utils/local-storage';
import { useAppDispatch } from './redux-tk/store/hooks';
import { useEffect, useState } from 'react';
import { setTokenForUser } from './redux-tk/slices/auth.slice';
import useToken from './hooks/useToken';
import ProtectedRoute from './UI/components/ProtectedRoute';
import withAuthentication from './UI/components/WithAuthenticationComponent';

const httpLink = createHttpLink({
  uri: `https://dungeon-of-trials-gateway-api.azurewebsites.net/graphql`,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      'GraphQL-preflight': 1,
      'Access-Control-Allow-Origin': '*',
      authorization: `bearer ${token}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const getRoutes = (routes: RouteType[]) => {
  if (routes) {
    return routes.map((route) => {
      const Layout = route.layout || MainLayout;
      const Page = route.page;
      if (route.authRequired) {
        const AuthenticatedPage = withAuthentication(Page);
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <AuthenticatedPage />
              </Layout>
            }
          />
        );
      } else {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      }
    });
  }
};

const App = () => {
  const locations = useLocation();
  const nav = useNavigate();
  // Kiểm tra nếu người dùng truy cập vào "/Logout"
  if (locations.pathname === '/Logout') {
    // Thực hiện Logout ở đây
    setAccessToken('');
    setRefreshToken('');
    removeAccessToken();
    removeRefreshToken();
    removeAllUserInfo();
    nav('/');
    location.reload();
  }
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Routes>
          {getRoutes(privateRoutes)}
          {getRoutes(publicRoutes)}
        </Routes>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
