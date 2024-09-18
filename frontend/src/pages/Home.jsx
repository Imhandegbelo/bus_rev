import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h1 className="text-3xl">Home page</h1>
    </div>
  );
}
