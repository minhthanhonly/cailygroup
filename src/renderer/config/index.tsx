import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Home } from '../pages/Home';
import { Module } from '../pages/Module';

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
    path: '/module',
    component: Module,
  },
  {
    path: '/login',
    component: FluidLayout,
  },
];
