import React from "react";
import { useNavigate } from "react-router-dom";
import { useDb } from "../contexts/DatabaseContext";

export default function StatsPage() {
  const { userInfo } = useDb();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>Stats</h1>
      <div>{`Following: ${userInfo.following}`}</div>
      <div>{`Number of Following: ${userInfo.following.length}`}</div>
      <div>{`Followers: ${userInfo.followers}`}</div>
      <div>{`Number of Followers: ${userInfo.followers.length}`}</div>
      <div>{`Use case: ${userInfo.useCase}`}</div>
      <div>{`Bio: ${userInfo.bio}`}</div>
    </div>
  );
}
