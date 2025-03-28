import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { logoutUser } from "../services/authService";
import { useSelector } from "react-redux";

function Logoutbtn() {
  const dispatch = useDispatch();
    const username =  useSelector((state) => state.auth.username);

  const handleLogout = async () => {
    try {
      const data = await logoutUser(username);
      dispatch(logout());
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };
  return (
    <button onClick={handleLogout}>
      Logout <i className="bx bx-log-out-circle bx-rotate-180"></i>
    </button>
  );
}

export default Logoutbtn;
