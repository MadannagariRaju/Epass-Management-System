import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllStudent(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [students, setStudents] = useState([]);

  // Fetch students from the backend when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${host}/api/auth/student/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position),
          },
        });

        const data = await response.json();

        if (data.success) {
          setStudents(data.students);
        } else {
          console.error('Failed to fetch students:', data.message);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Students</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            {/* <th>Parent Phone Numbers</th> */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                {student.class ? (
                  <div>
                    {student.class.section}, {student.class.department}, Year {student.class.year}
                  </div>
                ) : (
                  <div>Not available</div>
                )}
              </td>
              {/* <td>
                <div>
                  Parent Phone 1: {student.parentno.parentphno1}
                </div>
                {student.parentno.parentphno2 && (
                  <div>
                    Parent Phone 2: {student.parentno.parentphno2}
                  </div>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllStudent;
