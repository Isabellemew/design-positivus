import React from "react";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "../components/Cart/CartContext"; 
import Header from "../components/Header/Header";
import Register from "../components/Register/Register";
import Footer from "../components/Foother/Footer";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <>
        <Header />
        <Register />
        <Footer />
    </>
  );
};

export default RegisterPage;
