import React, { useState } from "react";
import "./Slider.css";

import img1 from "../../assets/paint7.jpg";
import img2 from "../../assets/paint8.jpg";
import img3 from "../../assets/paint9.jpg";

import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

const slides = [
  { id: 1, url: img1 },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
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
      {}
      <button className="slider-button prev" onClick={prevSlide}>
        <img src={leftArrow} alt="Previous" className="arrow-icon" />
      </button>

      <img src={slides[currentSlide].url} alt={`Slide ${currentSlide + 1}`} className="slide-image" />

      <button className="slider-button next" onClick={nextSlide}>
        <img src={rightArrow} alt="Next" className="arrow-icon" />
      </button>
    </section>
  );
};

export default Slider;
