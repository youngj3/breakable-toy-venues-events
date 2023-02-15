import React, { useState, useEffect, useCallback, useRef } from "react";
import CarouselData from "./CarouselData.js";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

const HomePageBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAutoplay, setActiveAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef();

  const settings = {
    maxItems: 6,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const goTo = useCallback(
    index => {
      if (!isAnimating) {
        setCurrentIndex(index);
        setIsAnimating(true);

        setTimeout(() => {
          setIsAnimating(false);
        }, settings.speed);
      }
    },
    [isAnimating, currentIndex]
  );

  const goNext = () => {
    goTo(currentIndex >= settings.maxItems - 1 ? 0 : currentIndex + 1);
  };

  const goPrev = () => {
    goTo(currentIndex <= 0 ? settings.maxItems - 1 : currentIndex - 1);
  };

  const playTimer = () => {
    setActiveAutoplay(true);
  };

  const pauseTimer = () => {
    setActiveAutoplay(false);
  };

  useEffect(() => {
    if (settings.autoplay && activeAutoplay) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = setTimeout(() => {
        goNext();
      }, settings.autoplaySpeed);
    }
  }, [currentIndex, activeAutoplay, isAnimating]);

  const nextBtn = () => {
    return (
      <FaArrowAltCircleRight
        className="right-arrow"
        onMouseEnter={pauseTimer}
        onMouseLeave={playTimer}
        onClick={() => goNext()}
      />
    );
  };

  const prevBtn = () => {
    return (
      <FaArrowAltCircleLeft
        className="left-arrow"
        onMouseEnter={pauseTimer}
        onMouseLeave={playTimer}
        onClick={() => goPrev()}
      />
    );
  };

  const slide = (index) => {
    const imagesToSlide = CarouselData
    return <img src={`${imagesToSlide[index].image}`} className="slide short-image" />
  };

  return (
    <div className="slider">
      {prevBtn()}
      {nextBtn()}
      {slide(currentIndex)}
    </div>
  )
}

export default HomePageBanner