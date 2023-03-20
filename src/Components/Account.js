import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { logout } from '../features/user'


const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const userData = JSON.parse(Cookies.get("user"))
  const token = Cookies.get("user")

  const handleDelete = async () => {
    const response = await fetch("http://localhost:4000/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: userData.email,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      alert(json.error);
      return;
    }

    dispatch(logout())
    Cookies.remove('token')
    Cookies.remove('user')
    navigate("/login");
  };
  return (
    <>
      <div className="account">
        <div className="user_card">
          <div className="username">
            <h1>{userData.username}</h1>
            <i title="edit" class="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="email">
            <span>{userData.email}</span>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="email">
            <span>{userData.company}</span>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
      <button onClick={handleDelete} className="deleteBtn">
        Delete Account
      </button>
    </>
  );
};

export default Account;
