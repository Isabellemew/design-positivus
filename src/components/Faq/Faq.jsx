import React, { useState } from 'react';
import './Faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Как оформить заказ на вашей платформе?",
      answer: "Выберите понравившийся товар, добавьте его в корзину и перейдите к оформлению заказа. Укажите адрес доставки и выберите удобный способ оплаты."
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем карты Visa, Mastercard, МИР, а также платежи через Kaspi.kz, Apple Pay и Google Pay."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Доставка по Алматы занимает 1-2 рабочих дня. В другие города Казахстана - от 3 до 7 рабочих дней в зависимости от удаленности."
    },
    {
      question: "Можно ли вернуть или обменять товар?",
      answer: "Да, в течение 14 дней с момента получения заказа вы можете вернуть или обменять товар при сохранении оригинальной упаковки и чека."
    },
    {
      question: "Как связаться с вашей службой поддержки?",
      answer: "Вы можете написать нам на почту support@inspiro.kz, позвонить по номеру +7 775 205 77 51 или воспользоваться онлайн-чатом на сайте."
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <div className="faq-accordion">
          {faqItems.map((item, index) => (
            <div 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
              >
                <h3>{item.question}</h3>
                <span className="accordion-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;