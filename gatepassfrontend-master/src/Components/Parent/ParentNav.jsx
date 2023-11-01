import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; 
export default function ParentNav() {

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  // Function to toggle the modal for each component
  const toggleModal = (modalName) => {
    setActiveModal(activeModal === modalName ? null : modalName);
  };

  const handleLogout = () => {
    localStorage.removeItem("authtoken_parent"); // Remove authtoken from localStorage
    navigate('/'); // Navigate to the home page ("/")
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" onClick={()=>{setActiveModal(null)}}>
              Parent
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
             
              
              </ul>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
            Logout
          </button>
            </div> 
          </div>
        </nav>

        {/* Render modals for each component conditionally */}
        <div className="container">
   
{/* {activeModal === 'hod' && (
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
)} */}

        </div>
      </div>
    </>
  );
}


