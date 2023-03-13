import React from 'react'

const Home = ({user, setUser}) => {
  const localUser = localStorage.getItem("user")
  if(localUser) {
    setUser(localUser)
  }
  return (
    <div>
      {user && <h1>Welcome {user}</h1> }
      {!user && <p>Login First</p> }
    </div>
  )
}

export default Home