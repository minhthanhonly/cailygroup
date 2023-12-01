import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Dayoff } from '../pages/Dayoff';
import { Group } from '../pages/Group';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Module } from '../pages/Module';
import { Timecard } from '../pages/Timecard';
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
