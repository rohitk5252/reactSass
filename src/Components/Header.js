import React from 'react'

const Header = ({user, setUser}) => {
  return (
   <header>
    <svg width="1920" height="460" fill="none" xmlns="http://www.w3.org/2000/svg" class="border-decor top"><path d="M1920 99.768V0H0v99.768l92.525 146.914 47.175-92.468 70.915-54.446 54.176 54.446 27.087-54.446 60.567 95.205 30.436-95.205 199.354 33.458L668.93 173.5l37.552 34.856 28.039-54.142 53.074 92.468 34.548-73.182 103.711-30.236 78.826 65.092 232.53-13.383 43.07 103.527 25.53 180.5 70.49-324.786 63.7-54.446Z" fill="#202020"></path></svg>
    <div className="container" id="header">
    <div className="logo_part">
        <p>{user}</p>
        <img src="" alt="" />
    </div>
    <nav>
        <ul className="navigation">
            <li><a href="">Home</a></li>
            <li><a href="">Users</a></li>
            <li><a href="">Account</a></li>
        </ul>
    </nav>
    <div className="log_part">
        <button>Login</button>
        <button>LogOut</button>
    </div>
    </div>
   </header>
  )
}

export default Header