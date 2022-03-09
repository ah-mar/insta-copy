import "./styles/App.css";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
import Profile from "./pages/profile";
import {  Routes, Route, Navigate } from "react-router-dom";
import {  getUser2, signoutUser } from "./services/firebase";
import { useState } from "react";

function App() {
  // const [userId, setUserId] = useState(getUser2());
  const [userId, setUserId] = useState(true); // temporarilt to access dashboard page

  function handleSignout() {
    signoutUser()
      .then((message) => {
        console.log(message);
        setUserId(null);
      })
      .catch((error) => console.log(error));
  }

  function handleUserDetails() {
    let user = getUser2();
    console.log("getUSer2Details", user);
  }

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/Login"
            element={
              userId ? (
                <Dashboard setUserId={setUserId} />
              ) : (
                <Login setUserId={setUserId} />
              )
            }
          />
          <Route
            path="/Signup"
            element={userId ? <Dashboard setUserId={setUserId} /> : <Signup />}
          />
          <Route path="/NotFound" element={<NotFound />} />
          <Route
            path="/Profile"
            element={userId ? <Profile /> : <Navigate replace to="/Login" />}
          />
          <Route
            path="/Profile/:username/:docId"
            element={userId ? <Profile /> : <Navigate replace to="/Login" />}
          />
          <Route
            path="/"
            element={
              userId ? (
                <Dashboard setUserId={setUserId} />
              ) : (
                <Navigate replace to="/Login" />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
