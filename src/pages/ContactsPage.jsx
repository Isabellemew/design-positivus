import React from "react";
import Cont from "../components/Cont/Cont"; 
import Faq from "../components/Faq/Faq";
import Footer from "../components/Foother/Footer";
import Header from "../components/Header/Header";

const ContactsPage = () => {
  return (
    <div>
      <Header />
      <h1>Контакты</h1>
      <Faq />
      <Cont />
      <Footer />
    </div>
  );
};

export default ContactsPage;
