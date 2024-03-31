import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
