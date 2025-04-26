import React, { useState } from "react";
import "./Slider.css";

const slides = [
  { id: 1, url: "/paint7.jpg" },
  { id: 2, url: "/paint8.jpg" },
  { id: 3, url: "/paint9.jpg" },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section id = "ImageSlider" className="slider">
      <button className="slider-button prev" onClick={prevSlide}>
        <img src="/left-arrow.png" alt="Previous" className="arrow-icon" />
      </button>

      <img src={slides[currentSlide].url} alt={`Slide ${currentSlide + 1}`} className="slide-image" />

      <button className="slider-button next" onClick={nextSlide}>
        <img src="/right-arrow.png" alt="Next" className="arrow-icon" />
      </button>
    </section>
  );
};

export default Slider;
