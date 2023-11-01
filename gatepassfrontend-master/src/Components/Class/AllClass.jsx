import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllClass() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [classes, setClasses] = useState([]);

  // Fetch classes from the backend when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${host}/api/data/class/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers here if needed
          },
        });

        const data = await response.json();

        if (data.success) {
          setClasses(data.classes);
        } else {
          console.error('Failed to fetch classes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Classes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Section</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classData) => (
            <tr key={classData._id}>
              <td>{classData._id}</td>
              <td>{classData.department}</td>
              <td>{classData.section}</td>
              <td>{classData.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllClass;
