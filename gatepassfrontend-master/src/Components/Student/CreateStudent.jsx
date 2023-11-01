import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Administration/createAdministrator.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


function CreateStudent(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;

  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
    email: '',
    password: '',
    year: '',
    department: '',
    section: '',
    parentphno1: '',
    parentphno2: '',
  });

  const [years, setYears] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [dataf, setdataf] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch the list of available years from the backend when the component mounts
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch(`${host}/api/data/class/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position)
          },
        });

        const data = await response.json();
        setdataf(data);

        if (data.success) {
          // Extract unique years from the response
          const uniqueYears = [...new Set(data.classes.map((c) => c.year))];
          setYears(uniqueYears);
        } else {
          console.error('Failed to fetch years:', data.message);
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    fetchYears();
  }, [host]);

  // Update departments based on the selected year
  useEffect(() => {
    if (formData.year && dataf.classes) {
      const filteredDepartments = dataf.classes
        .filter((c) => c.year === parseInt(formData.year))
        .map((c) => c.department);
      setDepartments([...new Set(filteredDepartments)]);
    } else {
      setDepartments([]);
    }
  }, [formData.year, dataf.classes]);

  // Update sections based on the selected department
  useEffect(() => {
    if (formData.department && dataf.classes) {
      const filteredSections = dataf.classes
        .filter((c) => c.year === parseInt(formData.year) && c.department === formData.department)
        .map((c) => c.section);
      setSections([...new Set(filteredSections)]);
    } else {
      setSections([]);
    }
  }, [formData.department, formData.year, dataf.classes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the form data to your backend for creating the student account
    console.log('Form data:', formData);

    try {
      const response = await fetch(`${host}/api/auth/student/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem(props.position)
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (res.success) {
        // Handle success
        // alert('Student created successfully');
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
          image:'',
          rollno: '',
          name: '',
          email: '',
          password: '',
          year: '',
          department: '',
          section: '',
          parentphno1: '',
          parentphno2: '',
        });
        // You can perform additional actions here, such as navigation or displaying messages to the user
      } else {
        // Handle failure
        alert('Failed to create Student. Please check your input.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating Student.');
      // You can handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Student Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rollno" className="form-label">
            Roll No
          </label>
          <input
            type="text"
            className="form-control inputtext"
            id="rollno"
            name="rollno"
            value={formData.rollno}
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
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            className="form-select inputtext"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {departments.length > 0 && (
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              className="form-select inputtext"
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
        )}
        {sections.length > 0 && (
          <div className="mb-3">
            <label htmlFor="section" className="form-label">
              Section
            </label>
            <select
              className="form-select inputtext"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Section
              </option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* <div className="mb-3">
          <label htmlFor="parentphno1" className="form-label">
            Parent Phone Number 1
          </label>
          <input
            type="text"
            className="form-control"
            id="parentphno1"
            name="parentphno1"
            value={formData.parentphno1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="parentphno2" className="form-label">
            Parent Phone Number 2 (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="parentphno2"
            name="parentphno2"
            value={formData.parentphno2}
            onChange={handleChange}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;
