/** @format */
import { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Login from "./Login";

const Private  = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/authenticate", { withCredentials: true })
      .then((response) => {
        console.log(userContext);
         setUserContext({
           isLoggedIn: true,
           data: response.data,
         });
      })
      .catch((error) => {
        setUserContext(false);
       
      });
  }, []);

  return userContext.isLoggedIn && userContext.data ? (
    <div>
      <h1>Welcome to Private</h1>
    </div>
  ) : (
    <Login />
  );
};

export default Private ;
