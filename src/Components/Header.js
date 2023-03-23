import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from 'react-avatar';
import Cookies from 'js-cookie';
import { logout } from '../store/features/userSlice';

const Header = () => {
    const dispatch = useDispatch()
    const user =    Cookies.get('user') ?  JSON.parse(Cookies.get('user')) : ""
    const navigate = useNavigate()

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        dispatch(logout())
        navigate("/login")
    }


  return (
   <header>
    <div className="container" id="header">
    <div className="logo_part">
        {user && <p onClick={()=> navigate("/account")}>{user.username[0] +  user.username[user.username.length-1]}</p>}
    </div>
    <nav>
        <ul className="navigation">
            <li><a href="">Home</a></li>
            <li><a href="">Users</a></li>
            <li><a href="">Account</a></li>
        </ul>
    </nav>
    <div className="log_part">
        
        {!user && <button>Login</button>}
        {user && <button onClick={handleLogout}>LogOut</button>}

    </div>
    </div>
   </header>
  )
}

export default Header