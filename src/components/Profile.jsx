import React from "react";
import Logoutbtn from "./Logoutbtn";
import { useSelector } from "react-redux";
function Profile() {
  const username = useSelector((state) => state.auth.username);
  return (
    <>
      <h1>Welcome, {username ? username : "Guest"}!</h1>
      <Logoutbtn />
    </>
  );
}

export default Profile;
