import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Foother/Footer";
import { useContext } from "react";
import { CartContext } from "../components/Cart/CartContext";
import Cart from "../components/Cart/Cart";
import "./CategoryPage.css";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const categoryId = 3; // ID для категории "Вещи"
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    // Вариант 1: Если API возвращает все категории с продуктами
    fetch(`${API_URL}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then(data => {
        console.log("API response:", data); // Для отладки

        // Проверяем структуру данных
        if (Array.isArray(data)) {
          if (data.length > 0 && data[0].hasOwnProperty('id') && data[0].hasOwnProperty('products')) {
            // Данные - это массив категорий, ищем категорию с ID 3
            const category = data.find(cat => cat.id === categoryId);
            
            if (category && category.products) {
              console.log(`Найдена категория ${category.name} с ID ${categoryId}, продуктов: ${category.products.length}`);
              setProducts(category.products);
              
              if (category.products.length > 0) {
                setSelectedProduct(category.products[0]);
              }
            } else {
              console.error(`Категория с ID ${categoryId} не найдена`);
              setError(`Категория "Вещи" не найдена`);
            }
          } else {
            // Данные - это просто массив продуктов, фильтруем по categoryId
            const filteredProducts = data.filter(product => product.categoryId === categoryId);
            console.log(`Отфильтровано ${filteredProducts.length} продуктов для категории ${categoryId}`);
            
            setProducts(filteredProducts);
            
            if (filteredProducts.length > 0) {
              setSelectedProduct(filteredProducts[0]);
            }
          }
        } else {
          throw new Error("Неверный формат данных");
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
      
    // Вариант 2: Если можно запросить продукты конкретной категории
    // Раскомментируйте этот блок и закомментируйте предыдущий fetch, если API поддерживает такой endpoint
    /*
    fetch(`${API_URL}/categories/${categoryId}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
    */
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    document.getElementById('featured-product')?.scrollIntoView({ behavior: 'smooth' });
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
          <p>Ошибка: {error}</p>
          <button onClick={() => window.location.reload()}>Повторить попытку</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="category-page vesh">
        <h1>Вещи</h1>
        
        <div className="products-container">
          <div className="product-list">
            <h2>Выберите товар</h2>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map(product => (
                  <div 
                    key={product.id} 
                    className={`product-card ${selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">{product.price} ₽</p>
                      <button 
                        className="add-to-cart-btn"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-products">Товары не найдены в категории "Вещи"</p>
              )}
            </div>
          </div>
          
          {selectedProduct && (
            <div id="featured-product" className="featured-product">
              <h2>Детальная информация</h2>
              <div className="featured-product-content">
                <div className="featured-product-image">
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
                </div>
                <div className="featured-product-info">
                  <h3>{selectedProduct.name}</h3>
                  <p className="product-description">{selectedProduct.description}</p>
                  <p className="product-details">
                    <strong>Артикул:</strong> {selectedProduct.sku || 'Н/Д'}<br />
                    <strong>Наличие:</strong> {selectedProduct.inStock ? 'В наличии' : 'Нет в наличии'}<br />
                    {selectedProduct.material && <><strong>Материал:</strong> {selectedProduct.material}<br /></>}
                    {selectedProduct.size && <><strong>Размер:</strong> {selectedProduct.size}<br /></>}
                  </p>
                  <div className="product-actions">
                    <p className="featured-product-price">{selectedProduct.price} ₽</p>
                    <button 
                      className="add-to-cart-btn large"
                      onClick={() => handleAddToCart(selectedProduct)}
                      disabled={!selectedProduct.inStock}
                    >
                      {selectedProduct.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Cart />
    </div>
  );
};

export default Items;