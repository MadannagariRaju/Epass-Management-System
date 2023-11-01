import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllAdministration(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [administrators, setAdministrators] = useState([]);

  // Fetch administrators from the backend when the component mounts
  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const response = await fetch(`${host}/api/auth/administrator/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken:localStorage.getItem(props.position)
            // You can add your authentication headers here if needed
          },
        });

        const data = await response.json();

        if (data.success) {
          setAdministrators(data.administrators);
        } else {
          console.error('Failed to fetch administrators:', data.message);
        }
      } catch (error) {
        console.error('Error fetching administrators:', error);
      }
    };

    fetchAdministrators();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Administrators</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {administrators.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.employeeid}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllAdministration;
