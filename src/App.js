import { useEffect, useState } from "react";
import { BrowserRouter, Form, Route, Routes, Navigate } from "react-router-dom";
import Account from "./Components/Account";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setToken(JSON.parse(localStorage.getItem(localUser)).token);
      setUser(localUser);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} setUser={setUser} token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Login user={user} setUser={setUser} setToken={setToken} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Signup user={user} setUser={setUser} setToken={setToken} />
              )
            }
          />
          <Route
            path="/account"
            element={
              user ? (
                <Account user={user} setUser={setUser} token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
