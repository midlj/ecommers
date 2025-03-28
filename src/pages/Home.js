import React from "react";
import { useSelector } from "react-redux";
import Logoutbtn from "../components/Logoutbtn";

function Home() {
  const username =  useSelector((state) => state.auth.username);
  return (
    <div>
      <h1>Welcome, {username ? username : "Guest"}!</h1>
      <Logoutbtn/>
    </div>
  );
}

export default Home;
