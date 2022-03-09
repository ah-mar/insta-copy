import { readAllDocs } from "../services/firebase";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/sidebar";

function App({ setUserId }) {
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState("");

  function handleSubmit(e, photoId) {
    e.preventDefault();
    console.log({ comment, photoId });
    // addComment method- send doc id and data object. Data is comment and current user.
  }

  useEffect(() => {
    readAllDocs("photos").then((data) => {
      console.log("dataArray", data);
      setPhotos(data);
    });

    readAllDocs("users").then((data) => {
      console.log("users", data);
      setUsers(data);
    });

    // getUser("3")
    // .then(data => console.log(data))
  }, []);

  return (
    <>
      <div class="app-header">
        <Header setUserId={setUserId} />
      </div>

      <div className="app">
        <div className="sidebar">
          <div className="app-sidebar">
            <Sidebar users={users} />
          </div>
        </div>

        <main className="app-main">
          {photos.map((photo) => {
            return (
              <div className="post">
                <div className="post-header">
                  <div className="post-header__author">
                    <div className="post-header__avatar">
                      <img
                        className="post-header__avatar"
                        src={`/images/avatars/${photo.author}.jpg`}
                        alt="post header avatar"
                      />
                    </div>
                    <p className="post-header__name">{photo.author}</p>
                  </div>
                  <a className="post-header__icon" href="#Home">
                    <img src="/images/icons/dots.svg" alt="more options" />
                  </a>
                </div>
                <div className="post-body">
                  <img
                    className="post-body__image"
                    src={photo.imageSrc}
                    alt=""
                  />
                </div>
                <div className="post-actions">
                  <div className="post-actions-left">
                    <span className="post-action__icon">
                      <img
                        src="/images/icons/favorite.svg"
                        alt="favorite"
                        className="action-icon"
                      />
                    </span>
                    <span className="post-action__icon">
                      <img
                        src="/images/icons/comment.svg"
                        alt="comment"
                        className="action-icon"
                      />
                    </span>
                    <span className="post-action__icon">
                      <img
                        src="/images/icons/send.svg"
                        alt="send"
                        className="action-icon"
                      />
                    </span>
                  </div>
                  <div className="post-actions-right">
                    <span className="post-action__icon">
                      <img
                        src="/images/icons/bookmark.svg"
                        alt="bookmark"
                        className="action-icon"
                      />
                    </span>
                  </div>
                </div>
                <div className="post-likes">
                  <span className="post-likes__avatar"> </span>
                  <span className="post-likes__title">
                    Liked by Me and others
                  </span>
                </div>
                <div className="post-title">
                  <span className="post-title__author">
                    <strong>{photo.author}</strong>
                  </span>{" "}
                  <span className="post-title__description">
                    {photo.caption}
                  </span>
                </div>
                <div className="post-comments">
                  <p className="post-comments__count">
                    View all {photo.comments.length} comments
                  </p>
                  {photo.comments.map((comment) => {
                    return (
                      <div className="post-comment">
                        <p className="post-comment__text">
                          {" "}
                          <span className="post-comment__author">
                            <strong>{comment.displayName}</strong>
                          </span>{" "}
                          {comment.comment}
                        </p>
                        <span className="post-comment__icon">
                          <img
                            src="/images/icons/favorite.svg"
                            alt="favorite"
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>

                <form
                  className="post-addComment"
                  onSubmit={(e) => handleSubmit(e, photo.photoId)}
                >
                  <input
                    className="post-addComment__input"
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <input
                    className="post-addComment__button"
                    type="submit"
                    value="Post"
                  />
                </form>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
