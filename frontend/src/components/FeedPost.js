import React from "react";
import piranhas from "../sample/posts/piranhas_poker.jpeg";
import profileImg from "../sample/posts/fakeProfileCircle.png";
import "../css/FeedPost.css";

function FeedPost(props) {
  // This is just a sample image we get from the public folder
  // Basically, we will later update this variable with the image that the post should display.
  const postSrc = piranhas;

  return (
    <>
      <div id="FeedPost">
        {/* <PortalNav></PortalNav> */}
        <div id="containerRect">
          <img id="postImage" src={props.image || postSrc}/>
          <div id="authorContainer">
            <img id="profileImg" src={props.authorProfilePic || profileImg} />
            <div id="authorName">{props.author ||  "Johnny R."}</div>
          </div>
          <div id="artTitle">{props.title || "Fishy Business"}</div>
          <div id="art-description">{props.description || "Piranhas playing poker with fish food"}</div>
          <div className="commentSec">
            <div className="commentDiv">
              <img src={profileImg} className="commentImg" />
              <div className="commentText">Awesome artwork! Keep it up!</div>
            </div>
            <div className="commentDiv">
              <img src={profileImg} className="commentImg" />
              <div className="commentText">Awesome artwork! Keep it up!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedPost;
