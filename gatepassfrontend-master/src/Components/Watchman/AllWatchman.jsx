import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllWatchman(props) {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [watchmen, setWatchmen] = useState([]);

  // Fetch watchmen from the backend when the component mounts
  useEffect(() => {
    const fetchWatchmen = async () => {
      try {
        const response = await fetch(`${host}/api/auth/watchman/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem(props.position)
          },
        });

        const data = await response.json();

        if (data.success) {
          setWatchmen(data.watchmen);
        } else {
          console.error('Failed to fetch watchmen:', data.message);
        }
      } catch (error) {
        console.error('Error fetching watchmen:', error);
      }
    };

    fetchWatchmen();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Watchmen</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {watchmen.map((watchman) => (
            <tr key={watchman._id}>
              <td>{watchman.phno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllWatchman;
