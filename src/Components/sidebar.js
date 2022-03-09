import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser2, readOneDoc, getUserDetails } from "../services/firebase";
import "../styles/sidebar.css";

export default function Sidebar({ users }) {
  const [loginUser, setLoginUser] = useState("Champ");
  console.log("users -sidebar", users);

  useEffect(() => {
    const currentUserId = getUser2();
    console.log("current user id is", currentUserId);
    getUserDetails(currentUserId).then((data) => {
      console.log("user is", data.username);
      console.log(`images/avatars/${loginUser}.jpg`);
      setLoginUser(data.username);
    });
  }, []);

  return (
    <div className="sidebar-container">
      <div className="user">
        <div className="user-avatar">
          <img
            src={`images/avatars/${loginUser}.jpg`}
            className="user-image"
            alt="user"
          />
          <p className="user-name">{loginUser}</p>
        </div>
        <button className="user-switch">Switch</button>
      </div>

      <div className="suggestion-header">
        <p className="suggested-header-text">Suggestions for you</p>
        <button className="suggested-header-button">See All</button>
      </div>
      {users.map((user) => {
        console.log(`images/avatars/${user.username}.jpg`);
        return (
          <div className="suggested-user">
            <div className="user-content">
              <img
                alt="user-avatar"
                className="suggested-image"
                src={`images/avatars/${user.username}.jpg`}
              />
              <div className="suggested-details">
                <Link to={`/profile/${user.username}/${user.docId}`}>
                  <p className="suggested-name">{user.username}</p>
                </Link>

                <p className="suggested-description">{user.docId}</p>
              </div>
            </div>
            <button className="suggested-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
}
