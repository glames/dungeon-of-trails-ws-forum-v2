import {
  Home,
  Airplay,
  Server,
  List,
  GitPullRequest,
  CheckSquare,
  Calendar,
  CloudDrizzle,
  Cpu,
  DollarSign,
  Coffee,
  HelpCircle,
  Codesandbox,
  Globe,
  LogOut,
} from 'react-feather';
import {
  HOME_PATH,
  THREAD_DISCUSSION,
  THREAD_HOWTOPLAY,
  THREAD_NEWS,
  THREAD_TIPS,
  TRACEABLE_ORIGIN_PATH,
} from '~/app/routes/paths';

import { IMenuList } from '~/app/models/menu.model';

export const MENUITEMS: IMenuList[] = [
  {
    menutitle: '',
    menucontent: '',
    Items: [
      {
        title: 'Home',
        path: HOME_PATH,
        icon: Home,
        type: 'link',
        badge: 'badge badge-success',
        active: false,
      },
      {
        title: 'Discussion',
        path: THREAD_DISCUSSION,
        icon: Coffee,
        type: 'link',
        badge: 'badge badge-success',
        active: false,
      },
      {
        title: 'Tips',
        path: THREAD_TIPS,
        icon: Codesandbox,
        type: 'link',
        bookmark: true,
        active: false,
      },
      {
        title: 'News',
        path: THREAD_NEWS,
        icon: Globe,
        type: 'link',
        active: false,
      },
      {
        path: '/Logout',
        icon: LogOut,
        title: 'Logout',
        type: 'link',
        active: false,
      },
    ],
  },
];
