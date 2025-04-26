import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../Cart/CartContext";
import "./News.css";

const newProducts = [
  { id: 1, name: "Картина", price: "17000 tg", img: "./src/assets/news1.png" },
  { id: 2, name: "Тумбочка", price: "46000 tg", img: "./src/assets/news2.jpg" },
  { id: 3, name: "Бежевый лук", price: "57000 tg", img: "./src/assets/news3.jpg" },
  { id: 4, name: "Розовый сервиз", price: "21000 tg", img: "./src/assets/news4.jpg" },
  { id: 5, name: "Фарфоровые статуэтки", price: "11000 tg", img: "./src/assets/news5.jpg" }
];

const NewProductsSlider = () => {
  const { addToCart } = useContext(CartContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section id = "News" className="new-products">
      <h2>Новые товары</h2>
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        className="slider-container"
      >
        {newProducts.map(product => (
          <div
            key={product.id}
            className="product-card"
            style={{ width: "90%", margin: "0 auto" }} // Уменьшаем ширину карточек
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img src={product.img} alt={product.name} />
            {hoveredProduct === product.id && (
              <div className="product-overlay">
                <p>{product.name}</p>
                <p>{product.price}</p>
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
