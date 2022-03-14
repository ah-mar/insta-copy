import logo from "../images/Logo.png";
import appstore from "../images/appStore.png";
import playstore from "../images/playStore.png";
import Footer from "../Components/footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUser, signupNewUser } from "../services/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  let navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log({ email, password, fullname, username });
    signupNewUser(email, password, fullname, username).then((uid) => {
      console.log("userId is", uid);
      //Create new user in the user database
      addUser(uid, username, fullname, email).then((ref) => {
        console.log(ref);
        //Redirect URL to dashboard
        navigate("/");
      });
    });
  }

  return (
    <>
      <p>Hello Signup</p>
      <div className="signup-main">
        <div className="home-hero-content">
          <div className="home-hero-content-form">
            <div className="signupForm-logo">
              <img src={logo} alt="Insta Logo" />
            </div>
            <p className="signupForm-subheading">
              Sign up to see photos and videos from your friends.
            </p>
            <button className="signupForm-loginButton">
              Log in with Facebook
            </button>
            <p className="home-loginForm-divider">OR</p>
            <form onSubmit={handleFormSubmit}>
              <label>
                <span className="home-loginform-label">Email</span>
                <input
                  className="signupForm-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <span className="home-loginform-label">Full Name</span>
                <input
                  className="signupForm-input"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </label>
              <label>
                <span className="home-loginform-label">Username</span>
                <input
                  className="signupForm-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                <span className="home-loginform-label">Password</span>
                <input
                  className="signupForm-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className="home-loginForm-button" type="submit">
                Sign up
              </button>
            </form>
            <p className="signupForm-disclaimer">
              By signing up, you agree to our <strong>Terms</strong> ,{" "}
              <strong>Data Policy</strong> and <strong>Cookies Policy </strong>{" "}
              .
            </p>
          </div>
          <div className="home-signup">
            <p>
              Have an account
              <Link className="home-signup-link" to="/Login">
                Log in
              </Link>
            </p>
          </div>
          <div className="home-appLinks">
            <p className="home-applinks-text">Get the App</p>
            <a>
              <img className="home-applinks-link" src={appstore} alt="" />
            </a>
            <a>
              <img className="home-applinks-link" src={playstore} alt="" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
