import './App.css';
import { Routes, Route } from "react-router-dom";
import EmailLogin from './Components/Login/EmailLogin';
import Admin from './Components/Admin/Admin';
import Administrator from './Components/Administration/Administrator';
import Hod from './Components/HOD/Hod';
import Teacher from './Components/Teacher/Teacher';
import Student from './Components/Student/Student';
import PhnoLogin from './Components/Login/PhnoLogin';
import Watchman from './Components/Watchman/Watchman';
import Parent from './Components/Parent/Parent';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<EmailLogin/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/administrator' element={<Administrator/>}></Route>
      <Route path='/hod' element={<Hod/>}></Route>
      <Route path='/teacher' element={<Teacher/>}></Route>
      <Route path='/student' element={<Student/>}></Route>
      <Route path='/login' element={<PhnoLogin/>}></Route>
      <Route path='/watchman' element={<Watchman/>}></Route>
      <Route path='/parent' element={<Parent/>}></Route>
    </Routes>
    </>
  );
}

export default App;
