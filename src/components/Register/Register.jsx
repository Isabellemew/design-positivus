import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // если нужны отдельные стили

const API_URL = "http://localhost:8080/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      await axios.post(`${API_URL}/users`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Автоматический вход после регистрации
      const loginRes = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password
      });

      if (loginRes.data.token) {
        localStorage.setItem("token", loginRes.data.token);
      }
      if (loginRes.data.user) {
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      }

      alert("Регистрация прошла успешно!");
      navigate("/");
    } catch (err) {
      alert("Ошибка: " + (err.response?.data?.error || "Попробуйте снова позже"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-content" style={{ margin: "40px auto" }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            name="name"
            placeholder="Введите имя"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Введите email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Подтвердите пароль</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default Register;