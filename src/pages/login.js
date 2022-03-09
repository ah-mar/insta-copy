import phone from "../images/phone.png";
import logo from "../images/Logo.png";
import appstore from "../images/appStore.png";
import playstore from "../images/playStore.png";
import { useState } from "react";
import { signinExistingUser } from "../services/firebase.js";
import Footer from "../Components/footer";
import { Link } from "react-router-dom";

function Login({ setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginSubmit(e) {
    e.preventDefault();
    console.log({ username, password });
    signinExistingUser(username, password).then((userId) => {
      console.log(userId);
      setUserId(userId);
    });
  }

  return (
    <>
      <div className="login-main">
        <div className="home hero-image">
          <img src={phone} alt="iphone with instagram app" />
        </div>
        <div className="home-hero-content">
          <div className="home-hero-content-form">
            <div className="home-loginForm-logo">
              <img src={logo} alt="Insta Logo" />
            </div>

            <form action="" onSubmit={handleLoginSubmit}>
              <label>
                <span className="home-loginform-label">
                  Phone number, username or email
                </span>
                <input
                  className="home-loginForm-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                <span className="home-loginform-label">Password</span>
                <input
                  className="home-loginForm-username"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="home-loginForm-button">
                Log In
              </button>
            </form>
            <p className="home-loginForm-divider">OR</p>
            <a href="#" className="home-loginForm-FacebookLink">
              Log In with Facebook
            </a>
            <a href="#" className="home-loginForm-forgotPassword">
              Forgot password?
            </a>
          </div>
          <div className="home-signup">
            <p>
              Don't have an account
              <Link className="home-signup-link" to="/Signup">
                Sign up
              </Link>
            </p>
          </div>
          <div className="home-appLinks">
            <p className="home-applinks-text">Get the App</p>
            <a href="#">
              <img
                className="home-applinks-link"
                src={appstore}
                alt="appstore"
              />
            </a>
            <a href="#">
              <img
                className="home-applinks-link"
                src={playstore}
                alt="playstore"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
