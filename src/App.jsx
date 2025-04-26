import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext"; 
import Header from "./components/Header/Header";
import "./App.css";
import ImageSlider from "./components/ImageSlider/Slider";
import InfoSection from "./components/InfoSection/InfoSection";
import Categories from "./components/Categories/Categories";
import Painting from "./components/Painti/Painting";
import News from "./components/News/News";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Foother/Footer";
import Faq from "./components/Faq/Faq";
import Cont from "./components/Cont/Cont";
import axios from 'axios';

function App() {
  const [data, setData] = useState("");

  const userData = {
    username: "exampleUser",  // Пример данных
    password: "examplePassword"
  };

  useEffect(() => {
    axios.post('http://localhost:8080/api/users', { name: "Aisha" })
      .then(res => setData(res.data.message))
      .catch(err => console.error("Ошибка при подключении к бэкенду:", err));
  }, []);

  return (
    <CartProvider>
      <Router>
        <Header />
        <ImageSlider />
        <InfoSection />
        <Categories />
        <Painting />
        <News />
        <Cart />
        <Faq />
        <Cont />
        <h1 style={{ textAlign: "center", color: "green" }}>{data}</h1> {/* Показываем сообщение от бэка */}
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
