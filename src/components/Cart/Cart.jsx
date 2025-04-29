import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-container">
      <button className="cart-button" onClick={toggleCart}>🛒</button>

      {isOpen && (
        <div className="cart-modal">
          <button 
            className="close-modal" 
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute", 
              top: "6px",
              right: "10px", 
              background: "none",
              border: "none",
              fontSize: "16px",
              color: "gray",
              cursor: "pointer"
            }}
          >
            ✖
          </button>

          <h2>Корзина</h2>
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li 
                  key={item.id} 
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}
                >
                  {item.name} - {item.price}
                  
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "#e4c0a8",
                      width: "30px", 
                      height: "25px",
                      border: "none",
                      fontSize: "15px",
                      cursor: "pointer", 
                      color: "black", 
                      lineHeight: "10px", 
                      marginRight: "5px"
                    }}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;