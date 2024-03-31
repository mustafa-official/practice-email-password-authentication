import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.checkbox.checked;
    const name = e.target.name.value;
    console.log(name);

    //clean error & success
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password should be a uppercase");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password should be a lowercase");
      return;
    } else if (!/[@$!%*?&]/.test(password)) {
      setError("Password should be a special character (@$!%*?&)");
      return;
    } else if (!checkbox) {
      setError("Accept Terms & Conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setSuccess("User create successfully");
        console.log(result.user);
        updateProfile(result.user, {
          displayName: name ,
          photoURL: "https://drive.google.com/file/d/1C7L6lwWuNqys1r6cKcy4oOSaOFKZDIeF/view?usp=drive_link",
        })
          .then(() => {
            console.log("Profile Updated");
          })
          .catch((error) => {
            console.log(error);
          });

        sendEmailVerification(result.user).then(() => {
          toast.success("Email verification sent!");
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleFormSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
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
              <div className="flex gap-2 mt-2">
                <input type="checkbox" name="checkbox" id="terms" />
                <label htmlFor="terms">
                  Accept our{" "}
                  <a className="text-primary" href="#">
                    Terms & Condition
                  </a>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <h2>
              Already have an account? Please{" "}
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
