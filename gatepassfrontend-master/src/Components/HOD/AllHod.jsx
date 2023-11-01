import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllHODs(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [hods, setHODs] = useState([]);

  // Fetch HODs from the backend when the component mounts
  useEffect(() => {
    const fetchHODs = async () => {
      try {
        const response = await fetch(`${host}/api/auth/hod/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position),
            // You can add your authentication headers here if needed
          },
        });

        const data = await response.json();

        if (data.success) {
          setHODs(data.hods);
        } else {
          console.error('Failed to fetch HODs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching HODs:', error);
      }
    };

    fetchHODs();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All HODs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {hods.map((hod) => (
            <tr key={hod._id}>
              <td>{hod.empid}</td>
              <td>{hod.name}</td>
              <td>{hod.email}</td>
              <td>{hod.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllHODs;
