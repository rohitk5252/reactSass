import React, { useEffect, useState } from 'react'

const Home = ({user, setUser, token}) => {
  const localUser = localStorage.getItem("user")
  const [allUsers, setAllUsers] = useState([])

  if(localUser) {
    setUser(localUser)
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch('http://localhost:4000/api/user/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const json = await response.json()
  
      if(!response.ok) {
        alert("could not fetch all users")
        return
      }
      console.log("All users:", json)
      setAllUsers(json)
    }


      
  if(localUser) {
    fetchAllUsers()
  }
  }, [])
  
  
  return (
    <div className='homepage'>
      {user && <h1>Welcome {user}</h1> }
      {!user && <p>Login First</p> }
      {allUsers.map(({_id, username, email, company})=>{
        return (
          <div key={_id} className="account home">
        <div className="user_card">
          <div className="username">
            <h1>{username}</h1>
            <i title="edit" class="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="email">
            <span>{email}</span>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
          <div className="email">
            <span>{company}</span>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
        )
      })}
    </div>
  )
}

export default Home