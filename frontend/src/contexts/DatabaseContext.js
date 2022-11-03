import React, { useContext, useState, useEffect } from "react";
import { db } from "../components/firebase";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  startAt,
  endAt,
  limit,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const DatabaseContext = React.createContext();

export function useDb() {
  return useContext(DatabaseContext);
}

export function DbProvider({ children }) {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState({
    uid: "",
    username: "",
    displayName: "",
    useCase: "",
    photoURL: "",
    artwork: [],
    followers: [],
    following: [],
  });

  function createUser(userObject) {
    const profilesRef = collection(db, "/profiles");
    return addDoc(profilesRef, userObject);
  }

  async function updateDb(newItem, uid) {
    console.log("updateDb was called.");
    console.log("newItem: ", newItem);
    const profilesRef = collection(db, "profiles");
    // gets doc in db that corresponds to current user
    const q = query(profilesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    //console.log(queryResult);
    //console.log(querySnapshot);
    //console.log(uid);
    //console.log(querySnapshot)

    const docs = [];
    var docId = "";
    querySnapshot.forEach((doc) => {
      // docs.push(doc);
      docId = doc.id;
    });
    // console.log("docs0", docs[0])
    // updates current db by adding new key/value pair, which replaces existing key if it exists (bc of merge)
    console.log("inside ran.");
    return setDoc(doc(profilesRef, docId), newItem, { merge: true });
  }

  async function getProfileData(uid) {
    const profilesRef = collection(db, "/profiles");
    const q = query(profilesRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    //console.log(queryResult);
    //console.log(querySnapshot);
    //console.log(uid);
    //console.log(querySnapshot)

    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    return docs[0];
  }
  // grabs doc with specified username, and augments that users follower list
  async function followUser(username) {
    // queries db for document with username to follow
    const profilesRef = collection(db, "/profiles");
    console.log("username", username);
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const docs = [];
    var docId;
    var doc1;
    await querySnapshot.forEach((doc) => {
      docId = doc.id;
      doc1 = doc.data();
    });
    console.log("doc0", username);

    //TODO: take followers list and edit it
    // updates current db by adding new key/value pair, which replaces existing key if it exists (bc of merge)
    console.log("doc", doc1);
    return setDoc(
      doc(profilesRef, docId),
      { followers: [...doc1.followers, username] },
      { merge: true }
    );
  }

  async function unfollowUser(username) {
    // queries db for document with username to follow
    const profilesRef = collection(db, "/profiles");
    console.log("username", username);
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const docs = [];
    var docId;
    var doc1;
    await querySnapshot.forEach((doc) => {
      docId = doc.id;
      doc1 = doc.data();
    });
    console.log("doc0", username);

    //TODO: take followers list and edit it
    // updates current db by adding new key/value pair, which replaces existing key if it exists (bc of merge)
    console.log("doc", doc1);
    const unfollowedList = doc1.followers.filter((val) => val !== username);
    return setDoc(
      doc(profilesRef, docId),
      { followers: unfollowedList },
      { merge: true }
    );
  }

  async function searchUsers(username) {
    console.log(username);
    const profilesRef = collection(db, "/profiles");
    const q = query(
      profilesRef,
      orderBy("username"),
      startAt(username),
      endAt(username + "\uf8ff"),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    //console.log(queryResult);
    //console.log(querySnapshot);
    //console.log(uid);
    //console.log(querySnapshot)

    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    console.log(docs);
    return docs;
  }

  async function getUIDfromUsername(username) {
    const profilesRef = collection(db, "/profiles");
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push(doc.data());
    });

    if (docs[0]) {
      return docs[0].uid;
    } else {
      return "";
    }
  }

  // TODO: Verify authentication before fetching (send the server a token, or something)
  async function uploadArtImage(file) {
    const { url } = await fetch(
      process.env.REACT_APP_SERVER_URL + "/upload-art"
    ).then((res) => {
      console.log("res", res);
      return res.json();
    });
    console.log("URL: ", url);
    // sends image to bucket url for hosting
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    // gets actual image, that is now stored on bucket
    const imageUrl = url.split("?")[0];
    console.log("IMAGEURL", imageUrl);

    return imageUrl;
    //var currentArt = userInfo.artwork;
    //currentArt.push(imageUrl);

    //return updateDb({artwork: currentArt}, currentUser.uid)
  }

  async function updateArtData(artworkObject) {
    var currentArt = userInfo.artwork;
    currentArt.push(artworkObject);
    return updateDb({ artwork: currentArt }, currentUser.uid);
  }

  async function likeSomeoneElsePost(userId, url) {
   console.log("liked someone else post"); 
    searchUsers(userId).then((user) => {
      console.log("user", user);
      var currentLikes = user[0].likes;
      currentLikes.push(url);
      console.log("currentLikes", currentLikes);
      return updateDb({ likes: currentLikes }, userId);

   // get this user's artwork
  });
}

  // TODO: like someone else's post
  // TODO: test whether follow works on someone else's profile
  // TODO: add comment functionality
  async function likeMyPost(e) {
    console.log("liked!");
    const targetUrl = document.getElementById("image").src
    const oldArtArray = userInfo.artwork.filter(
      (art) => art.url !== targetUrl
    );
    const artWorkObj = userInfo.artwork.filter(
      (art) => art.url === targetUrl
    )[0];
    console.log("artWorkObj", JSON.stringify(artWorkObj));
    const newLikes = [...artWorkObj.likes, userInfo.username];
    console.log("new likes", newLikes);
    console.log("old likes", artWorkObj.likes);
    console.log("username", userInfo.username);
    const newArtWorkObj = {...artWorkObj, likes: newLikes};
    const newArtArray = [...oldArtArray, newArtWorkObj];
    console.log("newArt", newArtArray);
    console.log("newArt", [JSON.stringify({ artwork: newArtArray }), currentUser.uid]);
    return updateDb({ artwork: newArtArray }, currentUser.uid);
  }

  async function unlikeMyPost(e) {
    console.log("unliked!");
    console.log("user artwork", userInfo.artwork);
    const targetUrl = document.getElementById("image").src
    console.log("targetUrl", targetUrl);
    const oldArtArray = userInfo.artwork.filter(
      (art) => art.url !== targetUrl
    );
    const artWorkObj = userInfo.artwork.filter(
      (art) => art.url === targetUrl
    )[0];
    console.log("artWorkObj", JSON.stringify(artWorkObj));
    // removes username of current user from likes array
    artWorkObj.likes = artWorkObj.likes.filter(like => like !== userInfo.username)
    console.log("new likes", artWorkObj.likes);
    console.log("username", userInfo.username);
    const newArtWorkObj = artWorkObj;
    console.log("newArtWorkObn", JSON.stringify(newArtWorkObj));
    const newArtArray = userInfo.artwork.map(art => {
      if (art.url === targetUrl) {
        return newArtWorkObj
      }
      return art
    })
    console.log("oldArtArray", oldArtArray);
    console.log("newArtArray", newArtArray);
    console.log("newArt", [JSON.stringify({ artwork: newArtArray }), currentUser.uid]);
    return updateDb({ artwork: newArtArray }, currentUser.uid);
  }

  // TODO: this function is getting called every second
  async function fetchUserData() {
    //console.log(currentUser.uid);
    if (!currentUser || currentUser === "loading") return;
    const userInfoObj = await getProfileData(currentUser.uid);
    console.log(userInfoObj);
    //console.log(userInfoObj);
    //console.log(currentUser.uid);
    setUserInfo(userInfoObj);
    //console.log(userInfoObj);
  }

  useEffect(fetchUserData, [currentUser]);
  //fetchUserData();

  const value = {
    createUser,
    getProfileData,
    fetchUserData,
    updateDb,
    uploadArtImage,
    updateArtData,
    getUIDfromUsername,
    searchUsers,
    followUser,
    unfollowUser,
    likeMyPost,
    unlikeMyPost,
    likeSomeoneElsePost,
    userInfo,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
