import React, { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './createAdministrator.css'

export default function CreateAdministration(props) {
  const BackendUrl=useSelector((state)=>state.GlobalValues.BackendUrl)

  const host=BackendUrl

  const [formData, setFormData] = useState({
    employeeid: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Send the form data to your backend for creating the administration account
    // console.log('Form data:', formData);
    // console.log(localStorage.getItem(props.position))
    try {
      const response = await fetch(`${host}/api/auth/administrator/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken:localStorage.getItem(props.position)

          // You can add your authentication headers here if needed
        },
        body: JSON.stringify({
          employeeid: formData.employeeid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const res = await response.json();
  
      if (res.success) {
        // Handle success
        // alert('Administration created successfully');
        toast.success("New Admin successfully!",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        })
        

        setFormData({
          employeeid: '',
          name: '',
          email: '',
          password: '',
        })
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create administration. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating administration.');
      // You can handle the error and display an appropriate message to the user
    }


    // Add your API call here to create the administration account
  };

  return (
    <div className="container mt-5">
      <h2>Create Administration Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 parent">
          <label htmlFor="employeeid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="employeeid"
            name="employeeid"
            value={formData.employeeid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control inputtext"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control inputtext"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
