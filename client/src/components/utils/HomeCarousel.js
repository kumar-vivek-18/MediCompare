import React, { useState, useEffect } from "react";
import DoctorImg from "../../assets/doctorImg.svg"
import Medicine from "../../assets/slider2.svg"

const HomeCarousel = () => {
  const slides = [
    {
      id: 1,
      text: "Discover the latest models and enjoy exclusive deals.",
      img: Medicine,
    },
    {
      id: 2,
      text: "Experience the best in luxury and comfort.",
      img: DoctorImg,
    },
    {
      id: 3,
      text: "Drive your dream car with unbeatable prices.",
      img: Medicine,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slides every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-[20px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full flex flex-col md:flex-row items-center gap-6 p-6"
          >
            {/* Text Section */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-3xl text-white mb-4 poppins-bold leading-12">{slide.text}</h2>
              <p className="text-sm md:text-lg poppins-regular text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan, metus ultrices.
              </p>
            </div>
            {/* Image Section */}
            <div className="flex-1">
              <img
                src={slide.img}
                alt={`Slide ${slide.id}`}
                className="rounded-lg z-10  w-full h-36 md:h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 flex items-center justify-center transform -translate-y-1/2 bg-transparent border-[1px] border-[#666666] text-white p-2 rounded-[100px] shadow hover:bg-gray-500"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2  flex items-center justify-center transform -translate-y-1/2 bg-transparent border-[1px] border-[#666666] text-white p-2 rounded-[100px] shadow hover:bg-gray-500"
      >
        &#8594;
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-3 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
