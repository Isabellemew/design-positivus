import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ImageSlider />
      <InfoSection />
      {children}
      <Painting />
      <News />
      <Cart />
      <Faq />
      <Cont />
      <Footer />
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Categories />
            </Layout>
          } />
          <Route path="/category/:categoryName" element={
            <Layout>
              <Categories />
            </Layout>
          } />
          <Route path="/category/:categoryName/product/:productId" element={
            <Layout>
              <Categories />
            </Layout>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
