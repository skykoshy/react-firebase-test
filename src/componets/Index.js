import React, { useState } from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function Index() {
  const auth = useAuth();
  const {uid} = auth.user
/* A hook that allows you to use state in (formsRegister). */
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
/* A hook that allows you to use state in t(formsLogin). */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(email, password);
    console.log(auth.user)
  };
  const handleGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle();
  };
  const handleLogout = () => {
    auth.logout();
  }
  return (
    <div className="container">
      {uid && <div className='d-grid gap-2'> <Link to="/show" className='btn btn-secondary mt-2 mb-2'>Show Task</Link> </div> }
      <form className="form">
        <h3 className="title">Register</h3>
        <input
          onChange={(e) => setEmailRegister(e.target.value)}
          className="form-control"
          type="email"
        />
        &nbsp;
        <input
          onChange={(e) => setPasswordRegister(e.target.value)}
          className="form-control"
          type="password"
        />
        <button onClick={(e) => handleRegister(e)} className="btn btn-primary mt-2 mb-2">
          Registro
        </button>
      </form>
      <form className="form">
        <h3 className="title">Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          type="email"
        />
        &nbsp;
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          type="password"
        />
        <button onClick={(e) => handleLogin(e)} className="btn btn-secondary mt-2 mb-2">
          Login
        </button>
        &nbsp;
        <button onClick={(e) => handleGoogle(e)} className="btn btn-secondary mt-2 mb-2">
          Google
        </button>
      </form>
      <button onClick={()=> handleLogout()} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default Index;