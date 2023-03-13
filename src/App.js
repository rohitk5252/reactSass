import { useState } from "react";
import { BrowserRouter, Form, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {
  const [user, setUser] = useState("")
  return (
    <div className="App">
      <BrowserRouter>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={user?<Home  user={user} setUser={setUser} />: <Login  user={user} setUser={setUser} />} />
        <Route path="/login" element={user?<Home  user={user} setUser={setUser}/>: <Login  user={user} setUser={setUser}/>} />
        <Route path="/signup" element={user?<Home  user={user} setUser={setUser}/>: <Signup  user={user} setUser={setUser}/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
