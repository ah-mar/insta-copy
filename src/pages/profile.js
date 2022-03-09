import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Components/Header";
import { getSomeDocs, readOneDoc } from "../services/firebase";
import "../styles/profile.css";

export default function Profile() {
  const testData = {
    username: "user",
    userId: "1",
    dateCreated: 1635277542013,
    emailAddress: "abc@example.com",
    following: ["1234"],
    followers: ["abcd"],
    fullName: "firstname lastname",
  };

  const [userDetail, setUserDetail] = useState(testData);
  const [userPhotos, setUserPhotos] = useState([]);
  console.log("usephotos", userPhotos);

  const param = useParams();
  console.log("param", param);

  useEffect(() => {
    readOneDoc(param.docId).then((data) => setUserDetail(data));
    getSomeDocs(param.username).then((data) => setUserPhotos(data));
  }, []);

  return (
    <>
      <div class="header-conatiner">
        <Header />
      </div>
      <div className="container">
        <div className="user-details">
          <div className="user-avatar">
            <img
              src={`/images/avatars/${param.username}.jpg`}
              alt="dali"
              className="user-avatar-image"
            />
          </div>
          <div className="user-info">
            <div className="user-info-header">
              <h2>{userDetail.username}</h2>
              <button className="user-info-follow">Follow</button>
              <img
                src="/images/icons/dots.svg"
                alt="show-more"
                style={{ width: "25px" }}
              />
            </div>
            <div className="user-info-stats">
              <p>
                <strong>24</strong> posts
              </p>
              <p>
                <strong>230 </strong>followers
              </p>
              <p>
                <strong>938 </strong>following
              </p>
            </div>
            <div className="user-info-desc">
              <h3>{userDetail.fullName}</h3>
              <p>Something Something Something</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="photos-grid">
          {userPhotos.map((item) => (
            <div className="img-container">
              <img
                style={{ width: "200px" }}
                src={item.imageSrc}
                alt="user-photos"
                className="profile-grid-image"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
