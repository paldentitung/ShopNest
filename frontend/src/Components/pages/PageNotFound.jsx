import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../common/MainButton";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen flex-col ">
      <img
        src="/PageNotFound.png"
        alt="page not found"
        className="h-120 w-120 object-cover"
      />
      <MainButton name="Go Home" onClick={() => navigate("/")} />
    </div>
  );
};

export default PageNotFound;
