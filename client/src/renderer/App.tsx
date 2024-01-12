import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Timecard } from './pages/Timecard';
import { TimecardSetting } from './pages/Timecard/TimecardSetting';
import { TimecardList } from './pages/Timecard/TimecardList';
import { TimecardEdit } from './pages/Timecard/TimecardEdit';
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
import Members from './pages/Members';
import MemberAdd from './pages/Members/MemberAdd';
import MemberEdit from './pages/Members/MemberEdit';
import MemberDetail from './pages/Members/MemberDetail';
import Protected from './Protected';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FluidLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Home />} />
              <Route path="timecards" element={<Timecard />} />
              <Route path="timecards/add" element={<Timecard />} />
              <Route path="timecards/setting" element={<TimecardSetting />} />
              <Route path="timecards/list" element={<TimecardList />} />
              <Route path="timecards/edit" element={<TimecardEdit />} />
              <Route path="timecarddetails/add" element={<Timecard />} />
              <Route path="timecarddetails/update" element={<Timecard />} />
              <Route
                path="timecarddetails/updatecomment"
                element={<Timecard />}
              />
              <Route path="holidays" element={<Timecard />} />

              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<UserAdd />} />
              <Route path="users/edit/:id" element={<UserEdit />} />
              <Route path="users/detail/:userid" element={<UserDetail />} />

              <Route path="members" element={<Members />} />
              <Route path="members/add" element={<MemberAdd />} />
              <Route path="members/edit/:id" element={<MemberEdit />} />
              <Route path="members/detail/:userid" element={<MemberDetail />} />

              <Route path="dayoffs" element={<Dayoff />} />
              <Route path="dayoffs/apply" element={<DayoffApply />} />
              <Route path="dayoffs/delete/:id" />
              <Route path="dayoffs/update/:id" />
              <Route path="dayoffs/register" element={<DayoffRegister />} />
              <Route path="dayoffs/getforuser/:id" />

              <Route path="group" element={<Group />} />
              <Route path="group/edit" element={<GroupEdit />} />
              <Route path="module" element={<Module />} />
            </Route>
          </Route>
          <Route path="/login" element={<FluidLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}
