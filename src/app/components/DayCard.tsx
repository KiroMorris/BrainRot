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
        relative w-full h-full min-h-[120px] p-3 rounded-xl transition-all duration-200 text-left
        bg-gradient-to-br ${dayData.color}
        active:scale-95
        ${isActive ? 'ring-2 ring-white/60 shadow-lg' : ''}
      `}
    >
      {/* Status badge */}
      {(isCompleted || isActive) && (
        <div className={`
          absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md
          ${isCompleted ? 'bg-green-500 text-white' : 'bg-white text-gray-900 font-bold'}
        `}>
          {isCompleted ? '✓' : isActive ? dayData.day : ''}
        </div>
      )}

      {/* Day number */}
      <span className="text-white/70 text-xs font-medium">
        Day {dayData.day}
      </span>

      {/* Title */}
      <h3 className="text-white font-bold text-sm leading-tight mt-0.5 line-clamp-2">
        {dayData.title}
      </h3>

      {/* Progress section */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="bg-black/20 rounded-full h-1.5 overflow-hidden mb-1">
          <div
            className={`h-full transition-all duration-500 rounded-full ${isCompleted ? 'bg-green-300' : 'bg-white/80'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-white/60 text-[10px]">
          {completedTasks}/{totalTasks}
        </span>
      </div>
    </button>
  );
}
