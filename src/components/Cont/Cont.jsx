import React, { useState } from 'react';
import './Cont.css';

const Cont = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contacts-section" id="cont">
      <div className="container">
        <h2 className="section-title">Контакты</h2>
        
        <div className="contacts-grid">
          <div className="contacts-info">
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#d4a373"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Адрес</h3>
                <p>г. Алматы, ул. Достык 136</p>
                <p>БЦ "Алматы Тауэрс", офис 45</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19 18H5C4.45 18 4 17.55 4 17V8L10.94 12.34C11.59 12.75 12.41 12.75 13.06 12.34L20 8V17C20 17.55 19.55 18 19 18Z" fill="#d4a373"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Электронная почта</h3>
                <p>info@inspiro.kz</p>
                <p>support@inspiro.kz</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="#d4a373"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Телефоны</h3>
                <p>+7 775 205 77 51</p>
                <p>+7 727 354 12 34</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#d4a373"/>
                  <path d="M12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="#d4a373"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Часы работы</h3>
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб-Вс: 10:00 - 16:00</p>
              </div>
            </div>
          </div>

          <div className="contacts-form">
            <h3>Остались вопросы?</h3>
            <p>Заполните форму и мы свяжемся с вами в течение рабочего дня</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Ваш email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Ваше сообщение"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Офис INSPIRO в Алматы"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b1d4b4b4b4b4b4b4b4b4b4b4b4b4b4b&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Cont;