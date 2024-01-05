import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Timecard } from './pages/Timecard';
import { TimecardSetting } from './pages/Timecard/TimecardSetting';
import { TimecardList } from './pages/Timecard/TimecardList';
import { TimecardEdit } from './pages/Timecard/TimecardEdit';
import { Member } from './pages/Member';
import { MemberAdd } from './pages/Member/MemberAdd';
import { MemberEdit } from './pages/Member/MemberEdit';
import { Users } from './pages/Users';
import { UserAdd } from './pages/Users/UserAdd';
import UserEdit from './pages/Users/UserEdit';
import { UserDetail } from './pages/Users/UserDetail';
import { Dayoff } from './pages/Dayoff';
import { DayoffRegister } from './pages/Dayoff/DayoffRegister';
import { DayoffApply } from './pages/Dayoff/DayoffApply';
import { Group } from './pages/Group';
import { GroupEdit } from './pages/Group/GroupEdit';
import { Module } from './pages/Module';
import Login from './pages/Login';
import DefaultLayout from './layouts/DefaultLayout';
import FluidLayout from './layouts/FluidLayout/FluidLayout';
import Protected from './Protected';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FluidLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="dashboard" element={<Home />} />

            <Route path="timecards" element={<Timecard />} />
            <Route path="timecards/add" element={<Timecard />} />
            <Route path="timecards/setting" element={<TimecardSetting />} />
            <Route path="timecards/list" element={<TimecardList />} />
            <Route path="timecards/edit" element={<TimecardEdit />} />

            <Route path="timecarddetails/add" element={<Timecard />} />

            <Route path="member" element={<Member />} />
            <Route path="member/add" element={<MemberAdd />} />
            <Route path="member/edit" element={<MemberEdit />} />

            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserAdd />} />
            <Route path="users/edit/:id" element={<UserEdit />} />
            <Route path="users/detail" element={<UserDetail />} />

            <Route path="day-off" element={<Dayoff />} />
            <Route path="day-off/register" element={<DayoffRegister />} />
            <Route path="day-off/apply" element={<DayoffApply />} />
            <Route path="day-off/delete/:id" />
            <Route path="day-off/update/:id" />

            <Route path="group" element={<Group />} />
            <Route path="group/edit" element={<GroupEdit />} />
            <Route path="module" element={<Module />} />
          </Route>
          <Route path="/login" element={<FluidLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
