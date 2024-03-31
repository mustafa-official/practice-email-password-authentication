import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../firebase/firebase.config";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const checkbox = e.target.checkbox.checked;
    //clean error & success
    setError("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setSuccess("Login Successfully");
        console.log(result.user);
        if (!result.user.emailVerified) {
          toast.error("Please verify your email!");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      setError("Please provide a email");
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setError("Please provide a valid email address");
      return;
    } else {
      setError("Please provide a valid email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input w-full input-bordered"
                  required
                />
                <div
                  onClick={handleShowPassword}
                  className="text-xl cursor-pointer absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%]"
                >
                  {showPassword ? (
                    <IoIosEyeOff></IoIosEyeOff>
                  ) : (
                    <IoMdEye></IoMdEye>
                  )}
                </div>
              </div>
              <label className="label">
                <a
                  onClick={handleResetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <h2>
              New to this website? Please{" "}
              <Link to="/register" className="text-primary font-bold">
                Register
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
