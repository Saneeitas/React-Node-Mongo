/** @format */
import { useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Login from "./Login";

const Success = () => {
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
      .catch((error) =>  { 
        setUserContext(false);
       
      });
  }, []);

  return userContext.isLoggedIn && userContext.data ? (
    <div>
        <h1>Success</h1>
      <h4>Welcome {userContext.data.username}</h4>
    </div>
  ) : (
    <Login />
  );
};

export default Success;
