import React, { useState } from 'react'
import login from '../assets/login.jpg'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'


const Auth = ({insideRegister}) => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = insideRegister ? await registerAPI(userData) : await loginAPI(userData);
      if (response.data.success) {
          alert(insideRegister ? "Registration Successful!" : "Login Successful!");
          navigate("/login");
      } else {
          alert(response.data.message);
      }
  } catch (error) {
      console.error("Error:", error);
  }
};

  return (
    <div style ={{minHeight:'100vh',width:'100%'} } className='d-flex justify-content-center align-items-center'>
         <div className='container w-75'>

<div className='card shadow p-2'>
  <div className='row align-items-center'>
    <div className='col-lg-6'>
      <img className='img-fluid' src={login} alt="" />
    </div>
    <div className='col-lg-6 p-4'>
      <h1 className='mt-2 fw-bolder'><i class="fa-solid fa-house-lock"></i>VILLA</h1>
      <h5 className='mt-2'>Sign {insideRegister ? 'up':'in'} to your Account</h5>
     <Form onSubmit={handleSubmit}>

        {
            insideRegister &&
            <FloatingLabel
            controlId="floatingInputName"
            label="Username"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Username" name="name" onChange={handleChange} />
          </FloatingLabel>
        }
     <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChange}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
      </FloatingLabel>

      {
          insideRegister ? 
          <div className='mt-3'>
            <button type='submit'  className='btn btn-primary mb-2'>Register</button>
            <p>Already A user? Please click here to <Link to={'/Login'}>Login</Link></p>
          </div>
          :
          
              <div className='mt-3'>
            <button type='submit'  className='btn btn-primary d-flex mb-2'>Login
              {/* {isLogin &&  <Spinner animation="border" variant="light" /> } */}
            </button>
            <p>New user? Please click here to <Link to={'/register'}>Register</Link></p>
          </div>
        
          
        }
     </Form>
      
    </div>

    </div>
    </div>
    </div>
    </div>
  )
}

export default Auth