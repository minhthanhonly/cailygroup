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
            <Route path="dashboard" element={<Protected Component={Home}/>} />
            <Route path="timecard" element={<Protected Component={Timecard} />} />
            <Route path="timecard/setting" element={<Protected Component={TimecardSetting} />} />
            <Route path="timecard/list" element={<Protected Component={TimecardList} />} />
            <Route path="timecard/update:id" element={<Protected Component={TimecardEdit} />} />
            <Route path="member" element={<Protected Component={Member} />} />
            <Route path="member/add" element={<Protected Component={MemberAdd} />} />
            <Route path="member/edit" element={<Protected Component={MemberEdit} />} />
            <Route path="users" element={<Protected Component={Users} />} />
            <Route path="users/add" element={<Protected Component={UserAdd} />} />
            <Route path="users/edit/:id" element={<Protected Component={UserEdit} />} />
            <Route path="users/detail" element={<Protected Component={UserDetail} />} />
            <Route path="day-off" element={<Protected Component={Dayoff} />} />
            <Route path="day-off/register" element={<Protected Component={DayoffRegister} />} />
            <Route path="day-off/apply" element={<Protected Component={DayoffApply} />} />
            <Route path="day-off/delete/:id" />
            <Route path="day-off/update/:id" />
            <Route path="group" element={<Protected Component={Group} />} />
            <Route path="group/edit" element={<Protected Component={GroupEdit} />} />
            <Route path="module" element={<Protected Component={Module} />} />
            </Route>
        </Routes>
      </div>
    </Router>
  );
}
