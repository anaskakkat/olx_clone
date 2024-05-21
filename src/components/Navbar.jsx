import React, { useContext } from "react";
import "./navbar.css";
import icon from "../assets/OLX-Symbol.png";
import { AuthContext } from "../store/FirebaseContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-gray-100 flex  p-3">
      <div className="flex  mx-3 gap-2">
        <div className="flex m-auto ml-1">
          <img 
            onClick={() => navigate(`/`)}
            className="h-6 w-12 flex cursor-pointer "
            src={icon}
            alt=""
          />
        </div>

        <input
          className=" flex border-2 ml-3 h-12 w-60 border-black p-4 rounded-sm"
          type="search"
          placeholder="india"
        />

        <div className="flex ml-8">
          <input
            type="search"
            className="search flex p-4 h-12  px-10  border-2 rounded-l-sm border-black"
            placeholder="Find Cars, Mobile Phones and more..."
            required
          />
          <button
            type="submit"
            className="p-2   text-white  bg-green-950  rounded-r-sm "
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div className={`flex ${user ? "gap-2 " : " gap-8"} m-auto pl-4`}>
          <h2 className=" text-md font-medium ">ENGLISH</h2>
          <h2 className=" text-md font-medium">
            {user ? (
              user.displayName.toUpperCase()
            ) : (
              <Link to={"/login"} className="hover:underline">
                Login
              </Link>
            )}
          </h2>
          {user && (
            <h2
              className="text-md font-medium text-blue-600 cursor-pointer hover:text-red-500"
              onClick={() => {
                const signout = signOut(auth);
                navigate("/login");
              }}
            >
              logout
            </h2>
          )}
          <div className="ml-2  ">
            <button
              onClick={() => navigate("/create")}
              className="sell_btn font-bold flex"
            >
              SELL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
