import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Foother/Footer";
import { useContext } from "react";
import { CartContext } from "../components/Cart/CartContext";
import Cart from "../components/Cart/Cart";
import "./CategoryPage.css"; // We'll create this shared CSS file

const Dishes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  
  const categoryId = 1; // ID for "Посуда" category
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then(data => {
        // Find the category with ID 1 (Посуда)
        const category = data.find(cat => cat.id === categoryId);
        if (category && category.products) {
          setProducts(category.products);
          if (category.products.length > 0) {
            setSelectedProduct(category.products[0]);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    // Smooth scroll to the featured product section
    document.getElementById('featured-product')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (product, event) => {
    if (event) {
      event.stopPropagation();
    }
    addToCart(product);
    
    // Show notification
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
      <div>
        <Header />
        <div className="category-page loading">
          <div className="spinner"></div>
          <p>Загрузка товаров...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="category-page error">
          <h2>Произошла ошибка</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="category-page">
        <h1>Посуда</h1>
        
        {selectedProduct && (
          <div id="featured-product" className="featured-product">
            <div className="featured-product-image">
              <img src={selectedProduct.img} alt={selectedProduct.name} />
            </div>
            <div className="featured-product-info">
              <h2>{selectedProduct.name}</h2>
              <p className="price">{selectedProduct.price}</p>
              {selectedProduct.author && <p className="author">Автор: {selectedProduct.author}</p>}
              <button 
                className="add-to-cart-btn" 
                onClick={(e) => handleAddToCart(selectedProduct, e)}
              >
                В корзину
              </button>
            </div>
          </div>
        )}
        
        <h2 className="products-title">Все товары в категории</h2>
        <div className="products-grid">
          {products.map(product => (
            <div 
              key={product.id}
              className={`product-item ${selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}`}
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.img} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
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
      <Cart />
      <Footer />
    </div>
  );
};

export default Dishes;