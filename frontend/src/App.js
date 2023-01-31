/** @format */
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Home from "./pages/Home";
import { UserContext } from "./context/UserContext";
import Private from "./pages/Private";

const App = () => {

  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/success" element={<Success />}></Route>
      <Route path="/private" element={<Private />}></Route>
    </Routes>
  );
};

export default App;
