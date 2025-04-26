import React from "react";
import logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Логотип */}
        <img src={logo} alt="Логотип" className="footer-logo" />

        {/* Текст */}
        <h1>INSPIRO </h1>
        <p>Платформа для ценителей искусства и вдохновения</p>
        <p>© {new Date().getFullYear()} Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
