import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useFormDy } from "../utils/useFormDy";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Register() {


//   const [value, handleChange] = useFormDy({
//     name: "",
//     email: "",
//     password: "",
//     cPassword: "",
//   });
  const [showPassword, setShowPassword] = useState(false);
    const [catchErro, setCatchErro] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
//   const password = watch('password')
//   console.log(password);
  
  const navigate = useNavigate();
  const onSubmit = async (fromData) => {
    try {
      const data = await registerUser({ ...fromData });
      navigate("/login?reg=succuss");
    } catch (error) {
        setCatchErro(()=>error?.response?.data ? error?.response?.data : 'Somthing Wrong Please try agin')
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <div className="wrapper register">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Registration</h2>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bx-user" />
                </span>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                //   value={value.name}
                //   onChange={handleChange}
                />
                <label>Name</label>
                {errors.name&& <p className="error">{errors.name?.message}</p>}
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bx-envelope" />
                </span>
                <input
                {...register("email")}
                  name="email"
                  type="text"
                //   value={value.email}
                //   onChange={handleChange}
                />
                <label>Email</label>
                {errors.email&& <p className="error">{errors.email?.message}</p>}
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                {...register("password")}
                  name="password"
                  type={showPassword ? "text" : "password"}
                //   value={value.password}
                //   onChange={handleChange}
                />
                <label>Password</label>
                {errors.password&& <p className="error">{errors.password?.message}</p>}
              </div>
              {/* confirm password */}
              <div className="input-box">
              <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                <i className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`} />
              </span>
                <input
                {...register("cPassword")}
                  name="cPassword"
                  type={showPassword ? "text" : "password"}
                //   value={value.cPassword}
                //   onChange={handleChange}
                />
                <label>Confirm Password</label>
                {errors.cPassword&& <p className="error">{errors.cPassword?.message}</p>}
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              {catchErro?.message && <p className="error text-center mt-2 mb-0 font-weight-bold">{catchErro.message}</p>}
              <div className="login-register">
                <p>
                  Already have an account?
                  <Link to="/login" className="register-link">
                    <button className="btn">Login</button>
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

export default Register;
