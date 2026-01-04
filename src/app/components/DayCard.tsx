"use client";

import { RecoveryDay } from "../data/brainrot";

interface DayCardProps {
  dayData: RecoveryDay;
  isActive: boolean;
  isCompleted: boolean;
  completedTasks: number;
  totalTasks: number;
  onClick: () => void;
}

export default function DayCard({
  dayData,
  isActive,
  isCompleted,
  completedTasks,
  totalTasks,
  onClick
}: DayCardProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-2xl transition-all duration-300 text-left
        bg-gradient-to-br ${dayData.color}
        ${isActive ? 'ring-4 ring-white/50 scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'}
        ${isCompleted ? 'opacity-90' : ''}
      `}
    >
      {/* Completion badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg">
          ✓
        </div>
      )}

      {/* Active indicator */}
      {isActive && !isCompleted && (
        <div className="absolute -top-2 -right-2 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
          NOW
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <span className="text-white/80 font-bold text-sm">Day {dayData.day}</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-1 leading-tight">
        {dayData.title}
      </h3>

      <p className="text-white/70 text-xs mb-3 line-clamp-1">
        {dayData.theme}
      </p>

      {/* Progress bar */}
      <div className="bg-black/20 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-white/80 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/60 text-xs mt-1">
        {completedTasks}/{totalTasks} tasks
      </p>
    </button>
  );
}
