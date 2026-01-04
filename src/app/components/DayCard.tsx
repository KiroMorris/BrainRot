"use client";

import { BrainRotDay } from "../data/brainrot";
import { useState } from "react";

interface DayCardProps {
  dayData: BrainRotDay;
  isActive: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

export default function DayCard({ dayData, isActive, isUnlocked, onClick }: DayCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={!isUnlocked}
      className={`
        relative w-full p-4 rounded-2xl transition-all duration-300 text-left
        ${isUnlocked
          ? `bg-gradient-to-br ${dayData.color} cursor-pointer hover:scale-105 hover:shadow-2xl`
          : 'bg-gray-700 cursor-not-allowed opacity-50'}
        ${isActive ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-4xl">{isUnlocked ? dayData.emoji : "🔒"}</span>
        <span className="text-white/80 font-bold text-lg">Day {dayData.day}</span>
      </div>

      <h3 className="text-white font-bold text-xl mb-1">
        {isUnlocked ? dayData.title : "???"}
      </h3>

      {isUnlocked && (
        <div className="mt-3">
          <div className="bg-black/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all duration-500 rounded-full"
              style={{ width: `${dayData.rotLevel}%` }}
            />
          </div>
          <p className="text-white/70 text-xs mt-1">{dayData.rotLevel}% Brain Rot</p>
        </div>
      )}

      {isHovered && isUnlocked && (
        <div className="absolute -top-2 -right-2 bg-white text-black px-2 py-1 rounded-full text-xs font-bold animate-bounce">
          Click me!
        </div>
      )}
    </button>
  );
}
