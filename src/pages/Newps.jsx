import React from "react";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "../components/Cart/CartContext"; 
import Header from "../components/Header/Header";
import Painti from "../components/Painti/Painting";
import News from "../components/News/News";
import Footer from "../components/Foother/Footer";

const Newps = () => {
  const navigate = useNavigate();

  return (
    <>
        <Header />
        <Painti />
        <News />
        <a href="/newps">Новые товары</a>
        <Footer />
    </>
  );
};

export default Newps;
