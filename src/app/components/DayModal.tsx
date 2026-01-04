"use client";

import { RecoveryDay, Task } from "../data/brainrot";
import { useEffect, useState } from "react";

interface DayModalProps {
  dayData: RecoveryDay;
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
  onClose: () => void;
}

export default function DayModal({
  dayData,
  completedTaskIds,
  onToggleTask,
  onClose
}: DayModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const completedCount = dayData.tasks.filter(t => completedTaskIds.includes(t.id)).length;
  const allCompleted = completedCount === dayData.tasks.length;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-gradient-to-br ${dayData.color} rounded-3xl p-6 max-w-lg w-full my-8
          transform transition-all duration-500
          ${showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-white/60 font-medium text-sm">Day {dayData.day}</span>
            <h2 className="text-3xl font-bold text-white">{dayData.title}</h2>
            <p className="text-white/80 text-sm mt-1">{dayData.theme}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-white/90 mb-6">{dayData.description}</p>

        {/* Progress */}
        <div className="bg-black/20 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Today's Progress</span>
            <span className="text-white/80">{completedCount}/{dayData.tasks.length}</span>
          </div>
          <div className="bg-black/30 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${allCompleted ? 'bg-green-400' : 'bg-white/80'}`}
              style={{ width: `${(completedCount / dayData.tasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3 mb-4">
          <h3 className="text-white font-bold flex items-center gap-2">
            <span>📋</span> Today's Tasks
          </h3>
          {dayData.tasks.map((task) => {
            const isCompleted = completedTaskIds.includes(task.id);
            return (
              <button
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`
                  w-full text-left p-4 rounded-xl transition-all duration-200
                  ${isCompleted
                    ? 'bg-green-500/30 border-2 border-green-400'
                    : 'bg-black/20 border-2 border-transparent hover:border-white/30'}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                    transition-all duration-200
                    ${isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-white/50'}
                  `}>
                    {isCompleted && <span className="text-sm">✓</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{task.icon}</span>
                      <span className={`font-medium text-white ${isCompleted ? 'line-through opacity-70' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                    <p className={`text-white/70 text-sm mt-1 ${isCompleted ? 'line-through opacity-50' : ''}`}>
                      {task.description}
                    </p>
                    <span className="text-white/50 text-xs mt-1 inline-block">
                      ⏱ {task.duration}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="bg-black/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <p className="text-white/90 text-sm italic">{dayData.tip}</p>
          </div>
        </div>

        {/* Completion celebration */}
        {allCompleted && (
          <div className="mt-4 bg-green-500/30 rounded-xl p-4 text-center border-2 border-green-400">
            <span className="text-3xl mb-2 block">🎉</span>
            <p className="text-white font-bold">Day {dayData.day} Complete!</p>
            <p className="text-white/80 text-sm">You're crushing it. Keep going!</p>
          </div>
        )}
      </div>
    </div>
  );
}
