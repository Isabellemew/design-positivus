import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../Cart/CartContext";
import "./News.css";

const NewProductsSlider = () => {
  const addToCart = useContext(CartContext);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const newProducts = [
    {
      id: 28,
      name: "Картина",
      price: "17000",
      img: "/news1.png",
      author: "Masha",
      categoryId: 1
    },
    {
      id: 29,
      name: "Тумбочка",
      price: "46000",
      img: "/news2.jpg",
      author: "Alejanro",
      categoryId: 2
    },
    {
      id: 30,
      name: "Бежевый лук",
      price: "57000",
      img: "/news3.jpg",
      author: "Mishelle",
      categoryId: 3
    },
    {
      id: 31,
      name: "Розовый сервиз",
      price: "21000",
      img: "/news4.jpg",
      author: "Marilla",
      categoryId: 4
    },
    {
      id: 32,
      name: "Фарфоровые статуэтки",
      price: "11000",
      img: "/news5.jpg",
      author: "Damina",
      categoryId: 5
    }
  ];

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
        {newProducts.map(product => (
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
                <p>{product.price} ₸</p>
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
