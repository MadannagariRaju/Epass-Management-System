import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
function GetAdminstraionForm() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [forms, setForms] = useState([]);
    const [parentMessage, setParentMessage] = useState("")
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${host}/api/data/administrator/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem("authtoken_administrator")
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

  const handleAccept = async (_id) => {
    try {
      const response = await fetch(`${host}/api/data/administrator/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem("authtoken_administrator")
        },
        body: JSON.stringify({ _id }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success
        alert('Form accepted successfully.');
      } else {
        // Handle failure
        console.error('Failed to accept form:', data.message);
      }
    } catch (error) {
      console.error('Error accepting form:', error);
    }
  };

  const handleReject = async (_id, parentMessage) => {
    try {
      const response = await fetch(`${host}/api/data/administrator/decline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: localStorage.getItem("authtoken_administrator")
        },
        body: JSON.stringify({ _id, admin_message: parentMessage }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle success
        alert('Form rejected successfully.');
      } else {
        // Handle failure
        console.error('Failed to reject form:', data.message);
      }
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Administrator Forms</h2>
      <div className="row">
        {forms.map((form) => (
          <div className="col-md-4 mb-4" key={form._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Reason: {form.reason}</h5>
                <p className="card-text">Roll No: {form.rollno}</p>
                <p className="card-text">Name: {form.name}</p>
                <p className="card-text">Date & Time: {new Date(form.dateTime).toLocaleString()}</p>
                <p className="card-text">administrator Accepted: {form.admin_accepted.toString()}</p>
                <p className="card-text">administrator Rejected: {form.admin_rejected.toString()}</p>
                <p className="card-text">administrator Message: {form.admin_message}</p>
                <div className="mt-3">
                  {/* {!form.parent_accepted && ( */}
                    <>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => handleAccept(form._id)}
                      >
                        Accept
                      </button>
                      <input
                        type="text"
                        placeholder="Reason for Rejection"
                        onChange={(e) => setParentMessage(e.target.value)}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(form._id, parentMessage)}
                      >
                        Reject
                      </button>
                    </>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetAdminstraionForm;
