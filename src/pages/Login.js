import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useFormDy } from "../utils/useFormDy";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { login } from "../services/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "react-loading";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 6 characters")
    .required(),
});

function Login() {
  // const [value, handleChange] = useFormDy({
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [showPass, setShowpass] = useState(false);
  const [catchErro, setCatchErro] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (fromData) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await login({ ...fromData });
      dispatch(loginSuccess(data));
      setIsLoading(false);
    } catch (error) {
      setCatchErro(() =>
        error?.response?.data
          ? error?.response?.data
          : "Somthing Wrong Please try agin"
      );
      setIsLoading(false);
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <div className="wrapper register">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Login</h2>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bx-envelope" />
                </span>
                <input
                  {...register("email")}
                  type="text"
                  name="email"
                  // value={value.email}
                  // onChange={handleChange}
                />
                <label>Email</label>
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              <div className="input-box">
                <span className="icon" onClick={() => setShowpass(!showPass)}>
                  {showPass ? (
                    <i className="bx bxs-hide bx-rotate-180"></i>
                  ) : (
                    <i className="bx bxs-show"></i>
                  )}
                </span>
                <input
                  {...register("password")}
                  name="password"
                  type={`${showPass ? "password" : "text"}`}
                  // value={value.password}
                  // onChange={handleChange}
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
                <label>Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn">
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <Loading type="bars" color="#fff" height={35} width={35} />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              {catchErro?.message && (
                <p className="error text-center mt-2 mb-0 font-weight-bold">
                  {catchErro.message}
                </p>
              )}
              <div className="login-register">
                <p>
                  Dont have an account?
                  <Link to="/register" className="register-link">
                    <button className="btn">Register</button>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
