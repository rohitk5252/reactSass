import { useEffect } from "react";
import { BrowserRouter, Form, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Account from "./Components/Account";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/features/userSlice";


function App() {
  const {username} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      const localUser = JSON.parse(Cookies.get("user"));
      dispatch(
        login({ username: localUser.username, token: Cookies.get("token") })
      );
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <p>{"user -"+ username}</p>
        <Routes>
          <Route
            path="/"
            element={username ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={username ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={username ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/account"
            element={username ? <Account /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
