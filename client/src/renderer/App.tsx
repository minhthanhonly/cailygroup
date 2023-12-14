import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import { Timecard } from './pages/Timecard';
import { TimecardSetting } from './pages/Timecard/TimecardSetting';
import { TimecardList } from './pages/Timecard/TimecardList';
import { TimecardEdit } from './pages/Timecard/TimecardEdit';
import { Member } from './pages/Member';
import { MemberAdd } from './pages/Member/MemberAdd';
import { MemberEdit } from './pages/Member/MemberEdit';
import { Users } from './pages/Users';
import { UserEdit } from './pages/Users/UserEdit';
import { Dayoff } from './pages/Dayoff';
import { DayoffRegister } from './pages/Dayoff/DayoffRegister';
import { DayoffApply } from './pages/Dayoff/DayoffApply';
import { Group } from './pages/Group';
import { GroupEdit } from './pages/Group/GroupEdit';
import { Module } from './pages/Module';
import DefaultLayout from './layouts/DefaultLayout';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="timecard" element={<Timecard/>} />
            <Route path="timecard/setting" element={<TimecardSetting/>} />
            <Route path="timecard/list" element={<TimecardList/>} />
            <Route path="timecard/edit" element={<TimecardEdit/>} />
            <Route path="member" element={<Member/>} />
            <Route path="member/add" element={<MemberAdd/>} />
            <Route path="member/edit" element={<MemberEdit/>} />
            <Route path="users" element={<Users/>} />
            <Route path="users/edit" element={<UserEdit/>} />
            <Route path="day-off" element={<Dayoff/>} />
            <Route path="day-off/register" element={<DayoffRegister/>} />
            <Route path="day-off/apply" element={<DayoffApply/>} />
            <Route path="group" element={<Group/>} />
            <Route path="group/edit" element={<GroupEdit/>} />
            <Route path="module" element={<Module/>} />
            <Route path="day-off/apply" element={<DayoffApply/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
