import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../Administration/createAdministrator.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function CreateClass(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;

  const [formData, setFormData] = useState({
    department: '',
    section: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend for creating the class
    console.log('Form data:', formData);

    try {
      const response = await fetch(`${host}/api/data/class/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem(props.position),
          // You can add your authentication headers here if needed
        },
        body: JSON.stringify({
          department: formData.department,
          section: formData.section,
          year: formData.year,
        }),
      });

      const res = await response.json();

      if (res.success) {
        // Handle success
        // alert('Class created successfully');
        toast.success("New Class Teacher added successfully!",{
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
          department: '',
          section: '',
          year: '',
        });
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create class. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the class.');
      // You can handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="section" className="form-label">
            Section
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="number"
            className="form-control inputtext"
            id="year"
            name="year"
            value={formData.year}
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

export default CreateClass;
