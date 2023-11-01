import React, { useState } from 'react';
import CreateAdministration from './../Administration/CreateAdministration';
import CreateHOD from './../HOD/CreateHOD';
import CreateTeacher from './../Teacher/CreateTeacher';
import CreateClass from './../Class/CreateClass';
import CreateStudent from './../Student/CreateStudent';
import AllAdministration from '../Administration/AllAdministration';
import AllHODs from '../HOD/AllHod';
import AllClass from '../Class/AllClass';
import AllTeacher from '../Teacher/AllTeacher';
import AllStudent from '../Student/AllStudent';
import CreateWatchman from '../Watchman/CreateWatchman';
import AllWatchman from '../Watchman/AllWatchman';
import { useNavigate } from 'react-router-dom'; 
import './AdminNav.css';
export default function AdminNav() {


  let position="authtoken_admin"
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  // Function to toggle the modal for each component
  const toggleModal = (modalName) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const handleLogout = () => {
    localStorage.removeItem(position); // Remove authtoken from localStorage
    navigate('/'); // Navigate to the home page ("/")
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" onClick={()=>{setActiveModal(null)}}>
              Admin
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item mx-2">
                  <button className="btn btn-light nav-link" onClick={() => toggleModal('administration')}>
                    Create Administration
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <button className="btn btn-light nav-link" onClick={() => toggleModal('hod')}>
                    Create HOD
                  </button>
                </li> */}
                <li className="nav-item mx-2">
                  <button className="btn2" onClick={() => toggleModal('teacher')}>
                    Create Teacher
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <button className="btn2" onClick={() => toggleModal('class')}>
                    Create Class
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <button className="btn2" onClick={() => toggleModal('student')}>
                    Create Student
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <button className="btn2" onClick={() => toggleModal('watchman')}>
                    Create WatchMan
                  </button>
                </li>
              </ul>
              <button className="btn2 btn21" onClick={handleLogout}>
            Logout
          </button>
            </div>
          </div>
        </nav>

        {/* Render modals for each component conditionally */}
        <div className="container">
        {activeModal === 'administration' && (
  <>
    <CreateAdministration onClose={() => toggleModal('administration')} position={position} />
    <AllAdministration position={position} />
  </>
)}
{activeModal === 'hod' && (
  <>
    <CreateHOD onClose={() => toggleModal('hod')} position={position} />
    <AllHODs position={position} />
  </>
)}
{activeModal === 'teacher' && (
  <>
    <CreateTeacher onClose={() => toggleModal('teacher')} position={position} />
    <AllTeacher position={position} />
  </>
)}
{activeModal === 'class' && (
  <>
    <CreateClass onClose={() => toggleModal('class')} position={position} />
    <AllClass position={position} />
  </>
)}
{activeModal === 'student' && (
  <>
    <CreateStudent onClose={() => toggleModal('student')} position={position} />
    <AllStudent position={position} />
  </>
)}
{activeModal === 'watchman' && (
  <>
    <CreateWatchman onClose={() => toggleModal('watchman')} position={position} />
    <AllWatchman position={position} />
  </>
)}
{activeModal===null && (
   <>
   <CreateAdministration onClose={() => toggleModal('administration')} position={position} />
   <AllAdministration position={position} />
 </>
)}

        </div>
      </div>
    </>
  );
}



// import React, { useState } from 'react';
// import CreateAdministration from './../Administration/CreateAdministration';
// import CreateHOD from './../HOD/CreateHOD';
// import CreateTeacher from './../Teacher/CreateTeacher';
// import CreateClass from './../Class/CreateClass';
// import CreateStudent from './../Student/CreateStudent';

// export default function AdminNav() {
//   const [activeModal, setActiveModal] = useState(null);

//   // Function to toggle the modal for each component
//   const toggleModal = (modalName) => {
//     setActiveModal(activeModal === modalName ? null : modalName);
//   };

//   return (
//     <>
//     <div>
//     <nav class="navbar navbar-expand-lg navbar-light bg-light">
//   <div class="container-fluid">
//         <a className="navbar-brand" href="#">
//           Admin
//         </a>
//         {/* <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button> */}

//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <button className="nav-link" onClick={() => toggleModal('administration')}>
//                 Create Administration
//               </button>
//             </li>
//             <li className="nav-item">
//               <button className="nav-link" onClick={() => toggleModal('hod')}>
//                 Create HOD
//               </button>
//             </li>
//             <li className="nav-item">
//               <button className="nav-link" onClick={() => toggleModal('teacher')}>
//                 Create Teacher
//               </button>
//             </li>
//             <li className="nav-item">
//               <button className="nav-link" onClick={() => toggleModal('class')}>
//                 Create Class
//               </button>
//             </li>
//             <li className="nav-item">
//               <button className="nav-link" onClick={() => toggleModal('student')}>
//                 Create Student
//               </button>
//             </li>
//           </ul>
//         </div>
//         </div>
//       </nav>

//       {/* Render modals for each component conditionally */}
//       <div className='container'>
//         {activeModal === 'administration' && <CreateAdministration onClose={() => toggleModal('administration')} />}
//         {activeModal === 'hod' && <CreateHOD onClose={() => toggleModal('hod')} />}
//         {activeModal === 'teacher' && <CreateTeacher onClose={() => toggleModal('teacher')} />}
//         {activeModal === 'class' && <CreateClass onClose={() => toggleModal('class')} />}
//         {activeModal === 'student' && <CreateStudent onClose={() => toggleModal('student')} />}
//       </div>
//     </div>
//   {/* );
// } */}

 
 
//      </>
//     )
//   }
