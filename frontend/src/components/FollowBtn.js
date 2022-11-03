import React, { useState, useEffect } from "react";
import check from "../sample/posts/check.svg";
import plus from "../sample/posts/plus.svg";
import "../css/FollowBtn.css";
import { useDb } from '../contexts/DatabaseContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'


function FollowBtn() {
  
  const { userInfo, updateDb, followUser, unfollowUser } = useDb();
  const { user } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  console.log("useeerinfo", userInfo)
  const [isFollowing, setIsFollowing] = useState(userInfo.following.includes(user));

  useEffect(() => {
    console.log("eherh", userInfo)
    setIsFollowing(userInfo.following.includes(user)
  )}, [userInfo])

  async function handleFollow() {
    setIsFollowing(true)
    console.log("user", user)
    await updateDb({following: [...userInfo.following, user]}, currentUser.uid)
    console.log("dffddfs", user)
    await followUser(user).then(res => console.log("res", res)).catch(err => console.error(err))
    navigate(0)
  }

  async function handleUnfollow() {
    setIsFollowing(false);
    console.log(userInfo.following)
    const users = userInfo.following;
    const unfollowedList = users.filter((val) => val !== user);
    await updateDb({following: unfollowedList}, currentUser.uid)
    await unfollowUser(user)
    navigate(0)

  }

  if (isFollowing) {
    return (
      <button id="followingBtn" onClick={handleUnfollow}>
        <img id="check" src={check} />
        Following
      </button>
    );
  } else {
    return (
      <button id="followBtn" onClick={handleFollow}>
        <img id="plus" src={plus} />
        Follow
      </button>
    );
  }
}

export default FollowBtn;
