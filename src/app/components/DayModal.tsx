"use client";

import { BrainRotDay } from "../data/brainrot";
import { useEffect, useState } from "react";

interface DayModalProps {
  dayData: BrainRotDay;
  onClose: () => void;
}

export default function DayModal({ dayData, onClose }: DayModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-gradient-to-br ${dayData.color} rounded-3xl p-6 max-w-lg w-full
          transform transition-all duration-500
          ${showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-6xl mb-2 block animate-bounce">{dayData.emoji}</span>
            <span className="text-white/60 font-medium">Day {dayData.day}</span>
            <h2 className="text-3xl font-bold text-white">{dayData.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-white/90 text-lg mb-6">{dayData.description}</p>

        <div className="bg-black/20 rounded-2xl p-4 mb-4">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>🤒</span> Symptoms
          </h3>
          <ul className="space-y-1">
            {dayData.symptoms.map((symptom, i) => (
              <li key={i} className="text-white/80 flex items-center gap-2">
                <span className="text-white/40">•</span> {symptom}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-black/20 rounded-2xl p-4 mb-4">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>💬</span> New Vocabulary Unlocked
          </h3>
          <div className="flex flex-wrap gap-2">
            {dayData.slang.map((word, i) => (
              <span
                key={i}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors cursor-default"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-black/20 rounded-2xl p-4">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>🧠</span> Brain Rot Level
          </h3>
          <div className="bg-black/30 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-1000 rounded-full animate-pulse"
              style={{ width: `${dayData.rotLevel}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-white/60 text-sm">Fresh Brain</span>
            <span className="text-white font-bold">{dayData.rotLevel}%</span>
            <span className="text-white/60 text-sm">Full Rot</span>
          </div>
        </div>
      </div>
    </div>
  );
}
