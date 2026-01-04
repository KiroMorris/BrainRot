"use client";

import { useState, useEffect } from "react";
import { motivationalQuotes } from "../data/brainrot";

export default function FloatingQuote() {
  const [quote, setQuote] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const changeQuote = () => {
      setIsVisible(false);
      setTimeout(() => {
        setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
        setIsVisible(true);
      }, 300);
    };

    changeQuote();
    const interval = setInterval(changeQuote, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6
        bg-gradient-to-r from-emerald-600 to-teal-600
        text-white px-5 py-3 rounded-full shadow-lg
        transition-all duration-300 z-40 max-w-[90vw] md:max-w-md text-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span className="font-medium text-sm md:text-base">{quote}</span>
    </div>
  );
}
