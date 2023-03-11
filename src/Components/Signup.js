import {React, useState} from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const handleSignup = (e) => {
    e.preventDefault();
  }


  return (
    <div className="signup-box">
      <h2>Signup</h2>
      <form>
        <div className="user-box">
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />

          <label>Email</label>
        </div>
        <div className="user-box password">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
          <label>Password</label>
        </div>
        <div className="user-box confpassword">
        <input type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} required={true} />
          <label>Confirm Password</label>
        </div>
        <a onClick={handleSignup} className="signup" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign Up
        </a>
      </form>
    <span className="newuser">Already Registerd? <Link to="/login">Login</Link></span>

    </div>
  );
};

export default Signup;
