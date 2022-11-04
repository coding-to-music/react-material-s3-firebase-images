import React, {  } from "react";
import ViewPage from "./ViewPage";
import { useDb } from "../contexts/DatabaseContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Fab, Button } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { BarChartOutlined } from "@mui/icons-material";

function handleImgClick(e, userObj) {
  document.getElementById("image").src = e.target.src;
  // sets modal name to user logged in
  // TODO: create a ref on image of author, then reference that
  console.log("dataset", e.target.dataset);
  document.getElementById("title").innerText = e.target.dataset.title;
  document.getElementById("description").innerText =
    e.target.dataset.description;
  document.getElementById("price").innerText = `$${e.target.dataset.price}`;
  // TODO: change to be more general, include public profile
  document.getElementById("view-author-name").innerHTML =
    userObj.displayName;
  document.getElementById("likes-stat").innerHTML = `likes: ${e.target.dataset.likes}`;
  var width = document.getElementById("image").style.width;
  // document.getElementById('image').style.width = '300px';
  var height =
    (300 * document.getElementById("image").height) /
    document.getElementById("image").width;
  console.log("height: ", parseInt(height));
  if (height > width) {
    height = `${Math.min(parseInt(height), 500)}px`;
    width = (height * width) / document.getElementById("image").height;
  } else {
    width = `${Math.min(parseInt(width), 800)}px`;
  }
  console.log(width);
  document.getElementById("image").style.width = width;

  document.getElementById("ViewPage").style.display = "block";
  document.getElementById("Profile").classList.toggle("blur");
  document.getElementById("PortalNav").classList.toggle("blur");
}


function Profile() {
  const navigate = useNavigate();

  const { userInfo, updateDb } = useDb();
  const { currentUser } = useAuth();

 
  // deletes img from firestore db and sends req to server to del from s3 bucket
  async function handleDelImg(val) {
    // creates new list of art with art passed in removed
    const newArt = userInfo.artwork.filter((art) => art !== val);
    // updates db with new artwork
    await updateDb({ artwork: newArt }, currentUser.uid);

    await fetch(process.env.REACT_APP_SERVER_URL + "/delete-art", {
      method: "POST",
      body: JSON.stringify({ val: val }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    navigate(0);
  }

  function handleMouseOverImg(val) {
    document.getElementById(`${val}-del`).style.display = "block";
  }

  return (
    <>
      <ViewPage id="ViewPage" />
      <div id="Profile">
        <div id="dashboard">
          <div className="flex profile-link" id="profile-div">
            <Link to="/settings" id="profile-link">
              <label htmlFor="edit-profile-btn">
                <button
                  id="edit-profile-btn"
                  className="profile-btn"
                  style={{ display: "none" }}
                >
                  Edit Profile
                </button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<AccountCircleIcon></AccountCircleIcon>}
                >
                  Edit
                </Button>
              </label>
            </Link>
            {process.env.REACT_APP_PHOTO_URL && <img className="profileImg" src={process.env.REACT_APP_PHOTO_URL} />}
            {/* {userInfo.photoURL && <img className="profileImg" src={userInfo.photoURL} />} */}
            <Link to="/stats" id="stats-link">
              <label htmlFor="stats-btn">
                <button
                  id="stats-btn"
                  className="profile-btn"
                  style={{ display: "none" }}
                >
                  Stats
                </button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<BarChartOutlined></BarChartOutlined>}
                >
                  Stats
                </Button>
              </label>
            </Link>
          </div>

          {currentUser && <h1>{currentUser.displayName}</h1>}
          {userInfo && <h2 className="profileName">{userInfo.displayName}</h2>}
          {userInfo && <p className="username"> {`@${userInfo.username}`}</p>}
          {userInfo && <p className="bio">{userInfo.bio}</p>}

          <label htmlFor="art-input">
            <button
              id="art-input"
              style={{ display: "none" }}
              onClick={() => navigate("/upload")}
            ></button>
            <Fab color="primary" size="small" component="span" aria-label="add">
              <AddIcon />
            </Fab>
          </label>
        </div>
        <div id="gallery">
          {userInfo.artwork &&
            userInfo.artwork.map((artObj) => {
              return (
                <div
                  key={artObj.url}
                  style={{ position: "relative" }}
                  onMouseOver={() => handleMouseOverImg(artObj.url)}
                  onMouseOut={() =>
                    (document.getElementById(
                      `${artObj.url}-del`
                    ).style.display = "none")
                  }
                >
                  <div className="container">
                    <img
                      alt="gallery"
                      className="galleryImg"
                      onClick={(e) => handleImgClick(e, userInfo)}
                      data-author={artObj.author}
                      data-title={artObj.title}
                      data-description={artObj.description}
                      data-price={artObj.price}
                      data-likes={artObj.likes.length}
                      src={artObj.url}
                    />
                  </div>
                  <button
                    onClick={() => handleDelImg(artObj)}
                    id={`${artObj.url}-del`}
                    style={{ display: "none" }}
                    className="del-btn"
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Profile;
