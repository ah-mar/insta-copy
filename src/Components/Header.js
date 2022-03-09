import { Link } from "react-router-dom";
import { signoutUser } from "../services/firebase";

export default function Header({ setUserId }) {
  function handleLogout(e) {
    console.log("handleLogout");
    signoutUser()
      .then((message) => {
        console.log(message);
        setUserId(null);
      })
      .catch((error) => console.log(error));
  }

  return (
    <header className="header">
      <div className="header-logo">
        <img
          className="header-logo-image"
          src="/images/logo.png"
          alt="Insta Logo"
        />
      </div>
      <div className="searchbar">
        <input className="header-input" type="text" placeholder="Search" />
      </div>
      <div className="navigation">
        <ul className="navigation-list">
          <li className="navigation-list-item" title="home">
            <Link to="/">
              <img src="/images/icons/home.svg" alt="home" />
            </Link>
          </li>
          <li className="navigation-list-item" title="send">
            <a>
              <img src="/images/icons/send.svg" alt="send" />
            </a>
          </li>
          <li className="navigation-list-item" title="add">
            <a>
              <img src="/images/icons/add.svg" alt="add" />
            </a>
          </li>
          <li className="navigation-list-item" title="explore">
            <a>
              <img src="/images/icons/compass.svg" alt="compass" />
            </a>
          </li>
          <li className="navigation-list-item" title="activity">
            <a>
              <img src="/images/icons/favorite.svg" alt="favorite" />
            </a>
          </li>
          <li className="navigation-list-item" title="profile">
            <a>
              <img src="/images/icons/avatar.svg" alt="avatar" />
            </a>
          </li>
          <li className="navigation-list-item" title="logout">
            <button onClick={handleLogout} className="logout-btn">
              <img src="/images/icons/logout.svg" alt="logout" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
