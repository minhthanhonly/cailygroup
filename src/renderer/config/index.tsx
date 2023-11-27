import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Home } from '../pages/Home';
import { Module } from '../pages/Module';
import { Users } from '../pages/Users';

export const config = [
  {
    path: '/',
    component: Home,
  },
  // {
  //   path: '/dashboard',
  //   component: Home,
  // },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/module',
    component: Module,
  },
  {
    path: '/login',
    component: FluidLayout,
  },
];
