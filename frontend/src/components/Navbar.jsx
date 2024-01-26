import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const excludedRoutes = ["/signin", "/signup"];
import { useAuth } from "../context/Usercontext";

const Navbar = () => {
  const { pathname } = useLocation();
  const {user, signout} = useAuth();




  if (excludedRoutes.some((item) => pathname.includes(item))) return null;

  return (
    <div>
      {user && (
        <div className="bg-slate-200 px-2 flex gap-4">
          Signed in as , {user.email}
          <button
            onClick={signout}
            className="font-semibold underline  underline-offset-2 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
      <div className="flex inset-x-0 bg-emerald-300 font-poppins font-semibold  px-10 py-5 justify-between items-center">
        <h1>RichDoc</h1>
        {!user && <Link to={"/signin"}>Signin</Link>}
         
      </div>
    </div>
  );

  return null;
};

export default Navbar;
