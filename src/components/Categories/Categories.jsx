import React, { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../Cart/CartContext"; 
import { useNavigate, useParams } from 'react-router-dom';
import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные");
        }
        return response.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
        
        // Если есть categoryId в URL, открываем модальное окно с этой категорией
        if (categoryName) {
          const category = data.find(cat => cat.id === parseInt(categoryName));
          if (category) {
            setSelectedCategory(category);
            setIsModalOpen(true);
            
            // Если есть productId в URL, выбираем этот продукт
            const pathParts = window.location.pathname.split('/');
            const productId = pathParts[pathParts.length - 1];
            if (productId && !isNaN(productId)) {
              const product = category.products.find(p => p.id === parseInt(productId));
              if (product) {
                setSelectedProduct(product);
              } else {
                setSelectedProduct(category.products[0]);
              }
            } else {
              setSelectedProduct(category.products[0]);
            }
            // Плавно прокручиваем к верху страницы
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
      })
      .catch(error => {
        console.error("Ошибка загрузки данных:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [categoryName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(category.products[0]);
    setIsModalOpen(true);
    navigate(`/category/${category.id}`);
    // Плавно прокручиваем к верху страницы
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
    setTimeout(() => {
      setSelectedCategory(null);
      setSelectedProduct(null);
    }, 300);
  };

  const selectProduct = (product, event) => {
    if (event) {
      event.stopPropagation(); 
    }
    setSelectedProduct(product);
  };

  const handleProductClick = (productId) => {
    if (selectedCategory) {
      const product = selectedCategory.products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        const categoryId = selectedCategory.id;
        navigate(`/category/${categoryId}/product/${productId}`, { replace: true });
      }
    }
  };

  const handleAddToCart = (product, event) => {
    if (event) {
      event.stopPropagation(); 
    }
    addToCart(product);
    
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.textContent = "Товар добавлен в корзину";
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  if (loading) {
    return (
      <div className="categories loading">
        <div className="spinner"></div>
        <p>Загрузка категорий...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories error">
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <section id = "Categories" className="categories">
      <h2>Выберите товар по категориям</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-card" key={index} onClick={() => openModal(category)}>
            <div className="category-image-container">
              <img src={category.img} alt={category.name} />
            </div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCategory && selectedProduct && (
        <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}>
          <div className={`modal ${isModalOpen ? "active" : ""}`} ref={modalRef}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              
              <h3 className="modal-title">{selectedCategory.name}</h3>
              
              <div className="product-display">
                <div className="main-product">
                  <div 
                    className="main-product-image" 
                    onClick={() => handleProductClick(selectedProduct.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={selectedProduct.img} alt={selectedProduct.name} />
                  </div>
                  <div className="main-product-info">
                    <h4 
                      onClick={() => handleProductClick(selectedProduct.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {selectedProduct.name}
                    </h4>
                    <p className="price">{selectedProduct.price}</p>
                    {selectedProduct.author && <p className="author">Автор: {selectedProduct.author}</p>}
                    <button 
                      className="add-to-cart-btn main-btn" 
                      onClick={(e) => handleAddToCart(selectedProduct, e)}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
                
                <div className="products-container">
                  <h4>Другие товары:</h4>
                  <div className="products-list">
                    {selectedCategory.products.map((product) => (
                      <div 
                        className={`product-card ${selectedProduct.id === product.id ? "selected" : ""}`}
                        key={product.id} 
                        onClick={() => handleProductClick(product.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="product-image">
                          <img src={product.img} alt={product.name} />
                        </div>
                        <button 
                          className="add-to-cart-btn" 
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          В корзину
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;