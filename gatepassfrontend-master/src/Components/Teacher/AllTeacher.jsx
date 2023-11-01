import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllTeacher(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [teachers, setTeachers] = useState([]);

  // Fetch teachers from the backend when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${host}/api/auth/teacher/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position),
            // You can add your authentication headers here if needed
          },
        });

        const data = await response.json();

        if (data.success) {
          setTeachers(data.teachers);
        } else {
          console.error('Failed to fetch teachers:', data.message);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Teachers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.employeeid}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>
                {teacher.class.map((cls) => (
                  <div key={cls._id}>
                    {cls.section}, {cls.department}, Year {cls.year}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTeacher;
