"use client";

import { useState, useEffect } from "react";
import { randomQuotes } from "../data/brainrot";

export default function FloatingQuote() {
  const [quote, setQuote] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const changeQuote = () => {
      setIsVisible(false);
      setTimeout(() => {
        setQuote(randomQuotes[Math.floor(Math.random() * randomQuotes.length)]);
        setIsVisible(true);
      }, 300);
    };

    changeQuote();
    const interval = setInterval(changeQuote, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500
        text-white px-4 py-2 rounded-full shadow-lg
        transition-all duration-300 z-40
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span className="font-medium">{quote}</span>
    </div>
  );
}
