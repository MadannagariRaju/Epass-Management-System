import React, { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './EmailLoginCss.css'


export default function EmailLogin(){

    const navigate = useNavigate()
    const BackendUrl=useSelector((state)=>state.GlobalValues.BackendUrl)

    const host=BackendUrl

    const [credentials, setcredentials] = useState({email:"",password:"",position:""})
    
    const signin=async (a)=>{
        try{
        
        a.preventDefault();
        const response = await fetch(`${host}/api/auth/${credentials.position}/login`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors', // cors, *no-cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
           
          },
          // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
         // body data type must match "Content-Type" header
         body: JSON.stringify({"email":credentials.email,"password":credentials.password})
        });

        // console.log(response)
        // console.log("sending request")
        let res=await response.json(); // parses JSON response into native JavaScript objects
        // console.log("respose reached")
        if(res.success){
          toast.success("login successfully!",{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          })
            localStorage.setItem(`authtoken_${credentials.position}`,res.authtoken);

            // localStorage.setItem("name",res.name);
            
            // console.log(`authtoken_${credentials.position}`,res.authtoken)
            navigate(`/${credentials.position}`)

        }else{
            alert("Enter valid details")
        }
      }catch(error){
        console.log(error)
        document.getElementById("signin_error").innerHTML=error
      }
    }


      const handleonchange=(e)=>{
          setcredentials({...credentials,[e.target.name]:e.target.value})
      }

      useEffect(() => {
          console.log(BackendUrl)
      }, [])
      


    return (
        <>
        {/* <div>
           <form>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" name="email" className="form-control"  id="exampleInputEmail1" onChange={handleonchange} aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div className="form-group">
    <label htmlFor="email">Password</label>
    <input type="password" name='password' className="form-control" id="email" onChange={handleonchange} placeholder="Password"/>
  </div>

  <button type="submit" onClick={signin} className="btn btn-primary my-3">Submit</button>
</form>
        </div> */}

    <div className="parent">
    <div class="box">
                <div class="login">
                    LOGIN
                </div>
                <div class="username">
                  <span className="input-group-addon"><i className=""></i></span>
                  <input type="email" className="email" name="email" placeholder="Email..." onChange={handleonchange}/>
                    {/* <input class="email" type="email" placeholder="email"/> */}
                </div>
                <div class="password">
                <span className="input-group-addon"><i className=""></i></span>
                  <input type="password" className="pword" name="password" placeholder="Password..." onChange={handleonchange}/>
                    {/* <input class="pword" type="password" placeholder="password"/> */}
                </div>
                <div className="dropdown">
                    <select
                      name="position"
                      className="dropdown2"
                      onChange={handleonchange}
                      value={credentials.position}
                    >
                      <option value="">Role</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      {/* <option value="hod">Hod</option> */}
                      {/* <option value="administrator">Administrator</option> */}
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                {/* <div class="loginbtn">
                    <a href="///"><button class="btn">LOGIN</button></a>
                </div> */}
                <div className="loginbtn">
                  <a onClick={signin} className="btn">LOGIN</a>
                </div>
                
        </div>
        </div>
        </>
    )
}
