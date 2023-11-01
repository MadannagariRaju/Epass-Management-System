import React, { useEffect, useState } from 'react';
import CreateClass from '../Class/CreateClass';
import CreateStudent from '../Student/CreateStudent';
import AllClass from '../Class/AllClass';
import AllStudent from '../Student/AllStudent';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'
import './Teacher.css'

export default function TeacherNav() {
  const BackendUrl=useSelector((state)=>state.GlobalValues.BackendUrl)

  const [hodData, sethodData] = useState({ "empid": "",
  "name": "",
  "email": "",
  "department": ""})
  const host=BackendUrl
  let position="authtoken_teacher"
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

  const getHod=async()=>{
    try {
      const response = await fetch(`${host}/api/auth/teacher/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken:localStorage.getItem(position)

          // You can add your authentication headers here if needed
        },
      
      });
  
      const res = await response.json();
      sethodData(res.data)
  console.log(res)
  } catch (error) {
    console.error(error);
    alert('An error occurred ');
   
  }
}

useEffect(() => {
getHod()
}, [])


  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" onClick={()=>{setActiveModal(null)}}>
              {hodData.name}
            </Link>
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
             
              
               
                <li className="nav-item mx-2">
                  <button className="btn2 btn btn-light nav-link" onClick={() => toggleModal('student')}>
                    Create Student
                  </button>
                </li>
          
              </ul>
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
            Logout
          </button>
            </div>
          </div>
        </nav>

        {/* Render modals for each component conditionally */}
        <div className="container">
   



{activeModal === 'student' && (
  <>
    <CreateStudent onClose={() => toggleModal('student')} position={position} />
    <AllStudent position={position} />
  </>
)}


        </div>
      </div>
    </>
  );
}


