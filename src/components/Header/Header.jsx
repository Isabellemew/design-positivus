import React, { useState } from "react";
import "./Header.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:8080/api";

const Header = () => {
  const navigate = useNavigate(); 
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // Категории для выпадающего меню
  const categories = [
    { id: 1, name: "Посуда", slug: "dishes" },
    { id: 2, name: "Статуэтки", slug: "figurines" },
    { id: 3, name: "Вещи", slug: "items" },
    { id: 4, name: "Мебель", slug: "furniture" },
    { id: 5, name: "Картины", slug: "paintings" }
  ];

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      
      // Фильтруем все товары из всех категорий
      const allProducts = data.flatMap(category => 
        category.products ? category.products.map(product => ({
          ...product,
          categoryId: category.id,
          categoryName: category.name
        })) : []
      );
      
      const filteredProducts = allProducts.filter(product => {
        if (!product) return false;
        
        const searchLower = searchQuery.toLowerCase();
        const nameMatch = product.name ? product.name.toLowerCase().includes(searchLower) : false;
        const authorMatch = product.author ? product.author.toLowerCase().includes(searchLower) : false;
        
        return nameMatch || authorMatch;
      });
      
      setResults(filteredProducts);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
      setResults([]);
    }
  };

  // Добавляем обработчик изменения input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setResults([]);
    }
  };

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
    if (!showAuthModal) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      alert("Успешный вход!");
      toggleAuthModal();
    } catch (err) {
      alert(err.response?.data?.error || "Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/users`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const loginResponse = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (loginResponse.data.token) {
        localStorage.setItem("token", loginResponse.data.token);
      }

      if (loginResponse.data.user) {
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
      }

      alert("Вы вошли как: " + (loginResponse.data.user?.name || "пользователь"));
      toggleAuthModal();
      navigate("/");
    } catch (err) {
      alert("Ошибка: " + (err.response?.data?.error || "Произошла ошибка. Попробуйте снова."));
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId, categoryId) => {
    navigate(`/category/${categoryId}/product/${productId}`, { replace: true });
    setSearchQuery('');
    setResults([]);
  };

  const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`);
    setShowCategoriesDropdown(false);
  };

  // Функция для перехода на главную страницу
  const navigateToHome = () => {
    navigate('/');
  };

  // Функция для перехода на страницу новых товаров
  const navigateToNewProducts = () => {
    navigate('/new-products');
  };

  // Функция для перехода на страницу контактов
  const navigateToContacts = () => {
    navigate('/contacts');
  };

  return (
    <header className="header">
      <div className="top-bar">
        <span className="contact">+7 775 205 77 51 | Пн-Вс с 11:30 до 22:00</span>
        <span className="delivery">Доставка по всему Казахстану</span>
      </div>

      <div className="nav-bar">
        <h1 className="logo">INSPIRO</h1>
        <nav>
          <ul>
          <li>
            <Link to="/" className="ImageSlider">Главная</Link>
          </li>
          <li className="categories-dropdown">
            <span 
              className="Categories" 
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
            >
              Категории
            </span>
              {showCategoriesDropdown && (
                <div className="dropdown-content">
                  {categories.map(category => (
                    <Link 
                      key={category.id} 
                      to={`/category/${category.slug}`}  // Используем Link с динамическим путем для категорий
                      className="dropdown-item"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li>
              <Link to="/newps">Новые товары</Link>
            </li>
            <li>
              <Link to="/contacts" className="nav-link">Контакты</Link>  {/* Ссылка на страницу контактов */}
            </li>
          </ul>
        </nav>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>🔍</button>
          
          {results.length > 0 && (
            <div className="search-results">
              {results.map(product => (
                <div 
                  key={product.id} 
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id, product.categoryId)}
                >
                  <img src={product.img} alt={product.name} />
                  <div className="search-result-info">
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                    <p>Автор: {product.author}</p>
                    <p>Категория: {product.categoryName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="account-icon" onClick={toggleAuthModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="#000000"
              strokeWidth="2"
            />
            <path
              d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {showAuthModal && (
        <div className="auth-modal">
          <div className="auth-modal-overlay" onClick={toggleAuthModal}></div>
          <div className="auth-modal-content">
            <button className="close-btn" onClick={toggleAuthModal}>
              &times;
            </button>

            <div className="auth-tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => handleTabChange("login")}
              >
                Вход
              </button>
              <button
                className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
                onClick={() => handleTabChange("register")}
              >
                Регистрация
              </button>
            </div>

            <div className="auth-form">
              {activeTab === "login" ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Пароль</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Введите пароль"
                      required
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    Войти
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Введите ваш email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Пароль</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Придумайте пароль"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Подтвердите пароль</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Повторите пароль"
                      required
                    />
                  </div>
                  <button type="submit" className="auth-submit-btn" disabled={loading}>
                    Зарегистрироваться
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;