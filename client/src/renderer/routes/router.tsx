import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Dayoff } from '../pages/Dayoff';
import { ApplyForLeave } from '../pages/Dayoff/ApplyForLeave';
import { Group } from '../pages/Group';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Module } from '../pages/Module';
import { Timecard } from '../pages/Timecard';
import { TimecardEdit } from '../pages/Timecard/TimecardEdit';
import { TimecardList } from '../pages/Timecard/TimecardList';
import { TimecardSetting } from '../pages/Timecard/TimecardSetting';
import { Users } from '../pages/Users';
import { UserEdit } from '../pages/Users/UserEdit';

export const config = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/timecard',
    component: Timecard,
  },
  {
    path: '/timecard-setting',
    component: TimecardSetting,
  },
  {
    path: '/timecard-list',
    component: TimecardList,
  },
  {
    path: '/timecard-edit',
    component: TimecardEdit,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/users-edit',
    component: UserEdit,
  },
  {
    path: '/day-off',
    component: Dayoff,
  },
  {
    path: '/day-off/ApplyForLeave',
    component: ApplyForLeave,
  },
  {
    path: '/group',
    component: Group,
  },
  {
    path: '/module',
    component: Module,
  },
  {
    path: '/login',
    component: Login,
    layout: FluidLayout,
  },
];
