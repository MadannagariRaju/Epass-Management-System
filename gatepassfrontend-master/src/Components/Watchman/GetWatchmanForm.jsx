import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function GetWatchmanForm() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${host}/api/data/watchman/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem("authtoken_watchman")
          },
        });

        const data = await response.json();

        if (data.success) {
          setForms(data.forms);
        } else {
          console.error('Failed to fetch parent forms:', data.message);
        }
      } catch (error) {
        console.error('Error fetching parent forms:', error);
      }
    };

    fetchForms();
  }, []);

  

  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Watchman Forms</h2>
      <div className="row">
        {forms.map((form) => (
          <div className="col-md-4 mb-4" key={form._id}>
            <div className="card">
              <div className="card-body">
                <p className="card-text">Roll No: {form.rollno}</p>
               
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetWatchmanForm;
