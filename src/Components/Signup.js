import {React, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = ({user, setUser}) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [company, setCompany] = useState("")
  const [type, setType] = useState("password")
  const navigate = useNavigate()


  // useEffect(()=>{
  //   const localUser = localStorage.getItem("user")
  //   if(localUser) {
  //     setUser(localUser);
  //     navigate("/")
  //   }
  // }, [])


  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        company
}) })
// console.log("response", response)


    const json = await response.json();
    console.log("json", json.error)

    if(!response.ok) {
      alert(json.error)
      return ;
    }

    localStorage.setItem("user", username);
    localStorage.setItem(username, JSON.stringify({
      email, company
    }))

    setUser(username)
    navigate("/")
  }

  const handleEye = () => {
    const typeNew = type==="password" ? "text" : "password"
    setType(typeNew)
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
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
          <label>Username</label>
        </div>
        <div className="user-box confpassword">
        <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
          <label>Password</label>
          {type==="password" && <i onClick={handleEye} class="fa-solid fa-eye"></i>}
          {type==="text" && <i onClick={handleEye}  class="fa-solid fa-eye-slash"></i>}
        </div>
        <div className="user-box company">
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required={true} />
          <label>Company</label>
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
