/** @format */

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsSubmitting(true)
    axios
      .get("http://localhost:5000/user/logout", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setUserContext({
          isLoggedIn: true,
          data: response.data,
        });
      })
      .catch((error) => {
        setUserContext(false);
      });

    navigate("/");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button
        type="submit"
        fullWidth
        onClick={handleLogout}
        disabled={isSubmitting}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
