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
    const interval = setInterval(changeQuote, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        fixed bottom-4 left-4 right-4 mx-auto max-w-md
        bg-gray-800/95 backdrop-blur-sm border border-gray-700
        text-white px-4 py-3 rounded-xl shadow-lg
        transition-all duration-300 z-40
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-emerald-400 text-lg">💬</span>
        <p className="text-sm text-gray-200 flex-1">{quote}</p>
      </div>
    </div>
  );
}
