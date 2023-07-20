import {
  HOME_PATH,
  TRACEABLE_ORIGIN_PATH,
  THREADS_PATH,
  POST_PATH,
  USER_PATH,
} from './paths';
import TraceableOriginPage from '../UI/pages/TraceableOriginPage';
import NotFoundLayout from '../UI/layouts/NotFoundLayout';
import NotFoundPage from '../UI/pages/NotFoundPage';
import HomePage from '../UI/pages/HomePage';
import ThreadsPage from '../UI/pages/ThreadsPage';
import PostPage from '../UI/pages/PostPage';
import UserPage from '../UI/pages/UserPage/HomePage';

export type RouteType = {
  path: string;
  page: () => JSX.Element;
  layout?: (...args: any[]) => JSX.Element;
  authRequired?: boolean;
};

export const publicRoutes: RouteType[] = [
  { path: '*', page: NotFoundPage, layout: NotFoundLayout },
];

export const privateRoutes: RouteType[] = [
  { path: HOME_PATH, page: HomePage },
  { path: POST_PATH, page: PostPage },
  { path: TRACEABLE_ORIGIN_PATH, page: TraceableOriginPage },
  { path: THREADS_PATH, page: ThreadsPage },
  { path: USER_PATH, page: UserPage },
];
