import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/authSlice";

const AuthWatcher = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Watch token changes

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    if (expiryTime < currentTime) {
      dispatch(logout());
    } else {
      const timeout = setTimeout(() => {
        dispatch(logout());
      }, expiryTime - currentTime);

      return () => clearTimeout(timeout); // Cleanup when token changes
    }
  }, [token, dispatch]);

  return null; // No UI needed
};

export default AuthWatcher;
