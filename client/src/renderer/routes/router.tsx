import { FluidLayout } from '../layouts/FluidLayout/FluidLayout';
import { Dayoff } from '../pages/Dayoff';
import { ApplyForLeave } from '../pages/Dayoff/ApplyForLeave';
import { DayoffApply } from '../pages/Dayoff/DayoffApply';
import { DayoffList } from '../pages/Dayoff/DayoffList';
import { DayoffRegister } from '../pages/Dayoff/DayoffRegister';
import { Group } from '../pages/Group';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Member } from '../pages/Member';
import { MemberAdd } from '../pages/Member/MemberAdd';
import { MemberEdit } from '../pages/Member/MemberEdit';
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
    path: '/member',
    component: Member,
  },
  {
    path: '/member-add',
    component: MemberAdd,
  },
  {
    path: '/member-edit',
    component: MemberEdit,
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
    path: '/day-off-list',
    component: DayoffList,
  },
  {
    path: '/day-off-register',
    component: DayoffRegister,
  },
  {
    path: '/day-off-apply',
    component: DayoffApply,
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
