import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../Administration/createAdministrator.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function CreateWatchman(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;

  const [formData, setFormData] = useState({
    phno: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend for creating the watchman account
    console.log('Form data:', formData);

    try {
      const response = await fetch(`${host}/api/auth/watchman/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem(props.position)
        },
        body: JSON.stringify({
          phno: formData.phno,
        }),
      });

      const res = await response.json();

      if (res.success) {
        // Handle success
        // alert('Watchman created successfully');
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
          phno: '',
        });
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create Watchman. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating Watchman.');
      // You can handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Watchman Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="phno" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="phno"
            name="phno"
            value={formData.phno}
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

export default CreateWatchman;
