import { useEffect, useState } from "react";
import { reset, logout } from "../feature/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const {isError, isSuccess,message} = useSelector((state)=>state.)

  useEffect(() => {
    if (user) {
      dispatch(reset());
    } else {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);


  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(reset());
  // };

  return (
    <div>
      {console.log("User: ", user)}
      <h1 className="text-3xl">Home page</h1>
      <p className="text-5xl">Welcome {user && user.name}</p>
      <br />
      <br />
      <button
        // onClick={handleLogout}
        className="py-3 text-2xl bg-rose-500 text-white hover:bg-rose-600 font-medium px-6 border rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}
