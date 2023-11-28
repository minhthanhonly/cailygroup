import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Dayoff } from '../pages/Dayoff';
import { Group } from '../pages/Group';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Module } from '../pages/Module';
import { Timecard } from '../pages/Timecard';
import { Users } from '../pages/Users';
import { AccoutEdit } from '../pages/Users/AccoutEdit';

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
    path: '/users',
    component: Users,
  },
  {
    path: '/AccoutEdit',
    component: AccoutEdit,
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
