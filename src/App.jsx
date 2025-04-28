import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./components/Cart/CartContext"; 
import Header from "./components/Header/Header";
import "./App.css";
import ImageSlider from "./components/ImageSlider/Slider";
import InfoSection from "./components/InfoSection/InfoSection";
import Painting from "./components/Painti/Painting";
import News from "./components/News/News";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Foother/Footer";
import Faq from "./components/Faq/Faq";
import Cont from "./components/Cont/Cont";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import Categories from "./components/Categories/Categories";

import "./App.css";
import Newps from "../src/pages/Newps";

const Layout = ({ children }) => (
  <>
    <Header />
    <ImageSlider/>
    <InfoSection/>
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="newps" element={<Newps />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="category/:categoryName" element={<Categories />} />
            <Route path="category/:categoryName/product/:productId" element={<Categories />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
