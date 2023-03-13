import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("password")
  const handleLogin = (e) => {
    e.preventDefault();
  }

  const handleEye = () => {
    const typeNew = type==="password" ? "text" : "password"
    setType(typeNew)
  }


  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
          <label>Password</label>
          {type==="password" && <i onClick={handleEye} class="fa-solid fa-eye"></i>}
          {type==="text" && <i onClick={handleEye}  class="fa-solid fa-eye-slash"></i>}
        </div>
        <a onClick={handleLogin} className="login" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Log in
        </a>
      </form>
    <span className="newuser"> New User ? <Link to="/signup">SignUp</Link></span>
    </div>
  );
};

export default Login;
