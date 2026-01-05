import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddImage from "./pages/addImage";
import Signup from "./pages/signUp";
import Login from "./pages/logIn";
import Navbar from "./layout/Navbar";
import PrivateRoute from "./layout/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import ForgotPass from "./pages/ForgotPass";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />



      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPass" element={<ForgotPass />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AddImage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/addImg" element={<AddImage />} />
          <Route path="/changePass" element={<ChangePassword />} />
        </Route>



      </Routes>


    </BrowserRouter>
  );
};

export default App;
