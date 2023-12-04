import {
  HOME_PATH,
  TRACEABLE_ORIGIN_PATH,
  THREADS_PATH,
  POST_PATH,
  USER_PATH,
  SCOREBOARD_PATH,
  ADMIN_LANDING_PATH,
  ADMIN_USER_LIST_PATH,
  ADMIN_USER_POST_PATH,
  CHANGE_PASSWORD_PATH,
  SEARCH_PATH,
} from './paths';
import NotFoundLayout from '../UI/layouts/NotFoundLayout';
import NotFoundPage from '../UI/pages/NotFoundPage';
import HomePage from '../UI/pages/HomePage';
import ThreadsPage from '../UI/pages/ThreadsPage';
import PostPage from '../UI/pages/PostPage';
import UserPage from '../UI/pages/UserPage/HomePage';
import ScoreboardPage from '../UI/pages/ScoreboardPage';
import AdminLandingPage from '../UI/pages/AdminPages/LandingPage';
import UserListPage from '../UI/pages/AdminPages/UserListPage';
import UserPostListPage from '../UI/pages/AdminPages/UserPostListPage';
import ChangePasswordPage from '../UI/pages/ChangePasswordPage';
import SearchPage from '../UI/pages/SearchPage';

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
  { path: THREADS_PATH, page: ThreadsPage },
  { path: USER_PATH, page: UserPage },
  { path: SEARCH_PATH, page: SearchPage },
  { path: SCOREBOARD_PATH, page: ScoreboardPage },
  { path: CHANGE_PASSWORD_PATH, page: ChangePasswordPage },
  { path: ADMIN_LANDING_PATH, page: AdminLandingPage, authRequired: true },
  { path: ADMIN_USER_LIST_PATH, page: UserListPage, authRequired: true },
  { path: ADMIN_USER_POST_PATH, page: UserPostListPage, authRequired: true },
];
