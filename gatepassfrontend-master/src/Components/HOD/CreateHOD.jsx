import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function CreateHOD(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;

  const [formData, setFormData] = useState({
    empid: '',
    name: '',
    email: '',
    password: '',
    department: '',
  });

  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch the list of unique departments from the backend when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${host}/api/data/class`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position),
            // You can add your authentication headers here if needed
          },
        });

        const data = await response.json();

        if (data.success) {
          // Extract unique departments from the response
          const uniqueDepartments = [...new Set(data.classes.map((c) => c.department))];
          setDepartments(uniqueDepartments);
        } else {
          console.error('Failed to fetch departments:', data.message);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [host]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your backend for creating the HOD account
    console.log('Form data:', formData);

    try {
      const response = await fetch(`${host}/api/auth/hod/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem(props.position),
          // You can add your authentication headers here if needed
        },
        body: JSON.stringify({
          empid: formData.empid,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          department: formData.department,
        }),
      });

      const res = await response.json();

      if (res.success) {
        // Handle success
        alert('HOD created successfully');

        setFormData({
          empid: '',
          name: '',
          email: '',
          password: '',
          department: '',
        });
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create HOD. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating HOD.');
      // You can handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create HOD Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="empid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empid"
            name="empid"
            value={formData.empid}
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            className="form-select"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateHOD;



// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// function CreateHOD() {
//   const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
//   const host = BackendUrl;

//   const [formData, setFormData] = useState({
//     empid: '',
//     name: '',
//     email: '',
//     password: '',
//     department: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Send the form data to your backend for creating the HOD account
//     console.log('Form data:', formData);

//     try {
//       const response = await fetch(`${host}/api/auth/hod/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           authtoken: localStorage.getItem('authtoken_admin'),
//           // You can add your authentication headers here if needed
//         },
//         body: JSON.stringify({
//           empid: formData.empid,
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           department: formData.department,
//         }),
//       });

//       const res = await response.json();

//       if (res.success) {
//         // Handle success
//         alert('HOD created successfully');

//         setFormData({
//           empid: '',
//           name: '',
//           email: '',
//           password: '',
//           department: '',
//         });
//         // You can perform additional actions here, such as navigation or displaying messages to the user
//       } else {
//         // Handle failure
//         alert('Failed to create HOD. Please check your input.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while creating HOD.');
//       // You can handle the error and display an appropriate message to the user
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Create HOD Account</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="empid" className="form-label">
//             Employee ID
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="empid"
//             name="empid"
//             value={formData.empid}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="department" className="form-label">
//             Department
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreateHOD;
