import logo from "../images/Logo.png";
import appstore from "../images/appStore.png";
import playstore from "../images/playStore.png";
import Footer from "../Components/footer";
import { Link } from "react-router-dom";

export default function Signup() {
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
            <form action="">
              <label>
                <span className="home-loginform-label">
                  Mobile number or email
                </span>
                <input className="signupForm-input" type="text" />
              </label>
              <label>
                <span className="home-loginform-label">Full Name</span>
                <input className="signupForm-input" type="text" />
              </label>
              <label>
                <span className="home-loginform-label">Username</span>
                <input className="signupForm-input" type="text" />
              </label>
              <label>
                <span className="home-loginform-label">Password</span>
                <input className="signupForm-input" type="text" />
              </label>
              <button className="home-loginForm-button">Sign up</button>
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
            <a >
              <img className="home-applinks-link" src={appstore} alt="" />
            </a>
            <a >
              <img className="home-applinks-link" src={playstore} alt="" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
