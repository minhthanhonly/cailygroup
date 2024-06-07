import {
  HashRouter as Router,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import Home from './pages/Home';
import { Timecard } from './pages/Timecard';
import { TimecardSetting } from './pages/Timecard/TimecardSetting';
import { TimecardList } from './pages/Timecard/TimecardList';
import { TimecardEdit } from './pages/Timecard/TimecardEdit';
import UserEdit from './pages/Users/UserEdit';
import { UserDetail } from './pages/Users/UserDetail';
import { Dayoff } from './pages/Dayoff';
import { DayoffRegister } from './pages/Dayoff/DayoffRegister';
import { DayoffApply } from './pages/Dayoff/DayoffApply';
import { Group } from './pages/Group';
import { GroupEdit } from './pages/Group/GroupEdit';
import { Module } from './pages/Module';
import { Application } from './pages/Application';
import { Estimate } from './pages/Estimate';
import Login from './pages/Login';
import DefaultLayout from './layouts/DefaultLayout';
import FluidLayout from './layouts/FluidLayout/FluidLayout';
import Members from './pages/Members';
import MemberAdd from './pages/Members/MemberAdd';
import MemberEdit from './pages/Members/MemberEdit';
import { Search } from './pages/Search/';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormAdd from './pages/Form/FormAdd';
import NewApplication from './pages/NewApplication';
import NewApplicationDetail from './pages/NewApplication/NewApplicationDetail';
import NewApplicationEdit from './pages/NewApplication/NewApplicationEdit';
import NewApplicationAdd from './pages/NewApplication/NewApplicationAdd';
import NewApplicationDetailEdit from './pages/NewApplication/NewApplicationDetailEdit';

export default function App() {
  const { id } = useParams<{ id: string }>();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FluidLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="dashboard" element={<Home />} />
              <Route path="timecards" element={<Timecard />} />
              <Route path="timecards/add" element={<Timecard />} />
              <Route path="timecards/setting" element={<TimecardSetting />} />
              <Route path="timecards/list" element={<TimecardList />} />
              <Route path="timecards/edit" element={<TimecardEdit />} />
              <Route path="timecarddetails/add" element={<Timecard />} />
              <Route path="timecarddetails/update" element={<Timecard />} />
              <Route path="timecarddetails/updateall" element={<Timecard />} />
              <Route
                path="timecarddetails/updatecomment"
                element={<Timecard />}
              />
              <Route path="holidays" element={<Timecard />} />
              <Route path="users/edit/:id" element={<UserEdit />} />
              <Route path="users/detail/:id" element={<UserDetail />} />
              <Route path="members" element={<Members />} />
              <Route path="members/add" element={<MemberAdd />} />
              <Route path="members/edit/:id" element={<MemberEdit />} />
              <Route path="dayoffs" element={<Dayoff />} />
              <Route path="dayoffs/apply" element={<DayoffApply />} />
              <Route path="dayoffs/delete/:id" />
              <Route path="dayoffs/update/:id" />
              <Route path="dayoffs/refuse/:id" />
              <Route path="dayoffs/register" element={<DayoffRegister />} />
              <Route path="dayoffs/getforuser/:id" />
              <Route path="dayoffs/getalluser/:id" />

              <Route path="group" element={<Group />} />
              <Route path="group/edit" element={<GroupEdit />} />
              <Route path="module" element={<Module />} />

              {/* Khu cua thịnh */}

              <Route path="Search" element={<Search />} />
              <Route path="estimate" element={<Estimate />} />

              {/* <Route
                path="estimate/8"
                element={<ExpenseReport id_table="8" />}
              />
              <Route
                path="estimate/9"
                element={<PriceBusinessReport id_table="9" />}
              />
              <Route
                path="estimate/10"
                element={<TravelAllowance id_table="10" />}
              /> */}
              {/* Khu cua thịnh */}

              <Route path="application" element={<Application />} />
              <Route path="application/edit/:id/:appId" element={<NewApplicationDetailEdit />} />
              <Route path="application/:tab" element={<Application />} />
              <Route
                path="application/getapplicationother/:id"
                element={<Application />}
              />
              <Route path="application/getforid/:id" />
              <Route path="form/add" element={<FormAdd />} />

              <Route path="newapplication" element={<NewApplication />} />
              <Route path="newapplication/add" element={<NewApplicationAdd />} />
              <Route
                path="newapplication/detail/:id"
                element={<NewApplicationDetail />}
              />
              <Route
                path="newapplication/edit/:id"
                element={<NewApplicationEdit />}
              />
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
