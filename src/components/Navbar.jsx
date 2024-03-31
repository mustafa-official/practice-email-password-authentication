import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <NavLink
        style={{ fontSize: "18px" }}
        to="/login"
        className={({ isActive }) =>
          isActive ? "text-secondary font-bold" : ""
        }
      >
        <h2>Login</h2>
      </NavLink>
      <NavLink
        style={{ fontSize: "18px" }}
        to="/register"
        className={({ isActive }) =>
          isActive ? "text-secondary font-bold" : ""
        }
      >
        <h2>Register</h2>
      </NavLink>
    </>
  );
  return (
    <div className="navbar px-10 bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/">
          <h2 className="text-2xl font-bold">Hello Users!</h2>
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1  flex gap-4">{navLinks}</ul>
      </div>
    </div>
  );
};

export default Navbar;
