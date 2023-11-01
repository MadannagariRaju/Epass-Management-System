import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

function CreateForm() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;

  const [formData, setFormData] = useState({
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend for creating the form
    try {
      const response = await fetch(`${host}/api/data/student/CreateForm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem("authtoken_student")
        },
        body: JSON.stringify({
          reason: formData.reason,
        }),
      });

      const res = await response.json();

      if (res.success) {
        // Handle success
        // alert('Form created successfully');
        toast.success("from submitted!",{
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
          reason: '',
        });
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create form. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the form.');
      // You can handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <textarea
            type="text"
            className="form-control"
            id="reason"
            name="reason"
            value={formData.reason}
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

export default CreateForm;
