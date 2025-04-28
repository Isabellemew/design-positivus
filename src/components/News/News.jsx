import React, { useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../Cart/CartContext";
import "./News.css";

const NewProductsSlider = () => {
  const { addToCart } = useContext(CartContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }
        const data = await response.json();
        
        // Получаем все товары из всех категорий
        const allProducts = data.flatMap(category => 
          category.products ? category.products.map(product => ({
            ...product,
            categoryId: category.id,
            categoryName: category.name
          })) : []
        );
        
        // Сортируем товары по ID в обратном порядке и берем первые 5
        const lastFiveProducts = allProducts
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
        
        setProducts(lastFiveProducts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="News" className="new-products">
        <h2>Новые товары</h2>
        <div className="loading">Загрузка...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="News" className="new-products">
        <h2>Новые товары</h2>
        <div className="error">{error}</div>
      </section>
    );
  }

  return (
    <section id="News" className="new-products">
      <h2>Новые товары</h2>
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        className="slider-container"
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            style={{ width: "90%", margin: "0 auto" }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img src={product.img} alt={product.name} />
            {hoveredProduct === product.id && (
              <div className="product-overlay">
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>Автор: {product.author}</p>
                <button className="add-to-cart" onClick={() => addToCart(product)}>В корзину</button>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default NewProductsSlider;
