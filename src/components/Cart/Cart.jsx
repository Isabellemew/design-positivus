import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });

  // Подсчет общей суммы
  const totalAmount = cartItems.reduce((total, item) => {
    // Предполагаем, что price - это строка вида "1000₽"
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return total + price;
  }, 0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: 1, // временно статично
          totalAmount: totalAmount,
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          items: cartItems.map(item => ({
            name: item.name,
            price: parseInt(item.price.replace(/[^\d]/g, "")) // чистое число
          }))
        })
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при оформлении заказа");
      }
  
      const data = await response.json();
      alert(`✅ Заказ №${data.order_id} успешно оформлен!`);
  
      setForm({ fullName: "", phone: "", address: "" });
      setIsOpen(false);
      // setCartItems([]); // если есть метод для очистки корзины
    } catch (error) {
      console.error(error);
      alert("❌ Не удалось оформить заказ. Попробуйте снова.");
    }
  };

  return (
    <div className="cart-container">
      <button className="cart-icon" onClick={toggleCart}>
        {cartItems.length > 0 ? `🛒 ${cartItems.length}` : "🛒"}
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <button
            className="close-cart"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          
          <h3>Корзина</h3>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span>🛍️</span>
              <p>Ваша корзина пуста</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li className="cart-item" key={item.id}>
                    <span>{item.name} - {item.price}</span>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                      title="Удалить"
                    >
                      🗑
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Итого:</span>
                <span>{totalAmount.toLocaleString()}Tg</span>
              </div>

              <form className="order-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Имя и фамилия"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Телефон"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Адрес доставки"
                  required
                />
                <button type="submit">Оформить заказ</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;