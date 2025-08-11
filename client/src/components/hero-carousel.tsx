import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600"
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
      
      {/* Images */}
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Luxury jewelry ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          data-testid={`hero-image-${index}`}
        />
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>

      {/* Previous/Next Arrows */}
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + heroImages.length) % heroImages.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors"
        data-testid="hero-prev"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % heroImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors"
        data-testid="hero-next"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}
