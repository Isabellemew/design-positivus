import React from "react";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "../components/Cart/CartContext"; 
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Footer from "../components/Foother/Footer";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
        <Header />
        <Login />
        <Footer />
    </>
  );
};

export default LoginPage;
