import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jsPDF } from "jspdf";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './AllForms.css'

function AllForms() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [forms, setForms] = useState([]);

  
  function downloadPDF() {

    console.log("hello")
    var doc = new jsPDF()
    var width = doc.internal.pageSize.getWidth()
    doc.text("Epass",width/2,10,{ align: 'center' })
    forms.map((form)=>{
      doc.text("Reason:\t" + form.reason.toUpperCase(),20, 20);
    doc.text("\n\n",20,80)
      
      doc.text( "RollNO:\t" + form.rollno,20, 30,);
      // document.write("<br>")
      doc.text("Name:\t" + form.name.toUpperCase(),20, 40);
      doc.text("DateTime:\t" + new Date(form.dateTime).toLocaleString(),20, 50 );
      doc.text("Accepted:\t" + form.teacher_accepted.toString().toUpperCase(),20, 60 );
      doc.text("Rejected:\t" + form.teacher_rejected.toString().toUpperCase(),20, 70);
      doc.text("message:\t" + form.teacher_message,20, 80);
    })
    doc.text("\n\n",20,80)
    doc.text("note: This epass valid only for today\r\r\r\r",20,90)
    doc.save("form.pdf");
 }

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${host}/api/data/student/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem("authtoken_student")
          },
        });

        const data = await response.json();

        if (data.success) {
          
          setForms(data.forms);
        } else {
          console.error('Failed to fetch forms:', data.message);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [host]);


  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Forms</h2>
      <form action="">
      <div className="row">
        {forms.map((form) => (
          <div className="col-md-4 mb-4" key={form._id}>
            <div className="card">
              <div className="card-body">
                <label htmlFor="reason"></label>
                <p className="card-title">{form.image}</p>
                <p className="card-title" id='reason'><b>Reason:   </b>{form.reason.toUpperCase()}</p>
                <p className="card-text" id='rollno'><b>Roll No:  </b>{form.rollno}</p>
                <p className="card-text" id='name'><b>Name: </b>{form.name.toUpperCase()}</p>
                <p className="card-text" id='datetime'><b>Date & Time: </b> {new Date(form.dateTime).toLocaleString()}</p>
                <p className="card-text" id='accepted'><b>Teacher Accepted: </b><strong className='accept'>{form.teacher_accepted.toString().toUpperCase()}</strong></p>
                <p className="card-text" id='rejected'><b>Teacher Rejected:  </b><strong className='reject'>{form.teacher_rejected.toString().toUpperCase()}</strong></p>
                {/* <p className="card-text">Parent Accepted: {form.parent_accepted.toString()}</p>
                <p className="card-text">Parent Rejected: {form.parent_rejected.toString()}</p> */}
                {/* <p className="card-text">Admin Accepted: {form.admin_accepted.toString()}</p>
                <p className="card-text">Admin Rejected: {form.admin_rejected.toString()}</p> */}
                {/* <p className="card-text">Sent Out: {form.sent_out.toString()}</p> */}
                {/* <p className="card-text">Teacher Name: {form.teacher_name}</p> */}
                {/* <p className="card-text">Administration Name: {form.administration_name}</p> */}
                <p className="card-text" id='message'><b>Teacher Message:  </b><strong className='reject'>{form.teacher_message}</strong> </p>
                <button onClick={downloadPDF} className='btn'>Download PDF</button>
                {/* <p className="card-text">Parent Message: {form.parent_message}</p> */}
                {/* <p className="card-text">Admin Message: {form.admin_message}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      </form>
    </div>
  );
}

export default AllForms;
