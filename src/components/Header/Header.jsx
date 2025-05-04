import "./Header.css";
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
  

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setResults([]);
    }
  };

  const handleProductClick = (productId, categoryId) => {
    navigate(`/category/${categoryId}/product/${productId}`);
    setSearchQuery("");
    setResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
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
              <Link to="/">Главная</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/admin">Админ-панель</Link>
                </li>
                {user.role === "admin" && (
                  <li>
                  </li>
                )}
                <li>
                  <span className="logout-link" onClick={handleLogout}>
                    Выйти
                  </span>
                </li>
              </>
            ) : (
              <li className="auth-dropdown">
                <span
                  className="Auth"
                  onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                >
                  Авторизация
                </span>
                {showAuthDropdown && (
                  <div className="auth-dropdown-content">
                    <Link to="/login" className="dropdown-item" onClick={() => setShowAuthDropdown(false)}>
                      Вход
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={() => setShowAuthDropdown(false)}>
                      Регистрация
                    </Link>
                  </div>
                )}
              </li>
            )}
            <li>
              <Link to="/newps">Новые товары</Link>
            </li>
            <li>
              <Link to="/contacts">Контакты</Link>
            </li>
          </ul>
        </nav>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
      </div>
    </header>
  );
};

export default Header;