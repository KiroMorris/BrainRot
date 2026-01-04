"use client";

import { RecoveryDay } from "../data/brainrot";
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
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    setShowContent(true);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const completedCount = dayData.tasks.filter(t => completedTaskIds.includes(t.id)).length;
  const allCompleted = completedCount === dayData.tasks.length;
  const progress = (completedCount / dayData.tasks.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gray-900"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Header - Fixed */}
      <div className={`flex-shrink-0 bg-gradient-to-br ${dayData.color} px-4 pt-4 pb-5`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center active:bg-black/30 transition-colors z-10"
          style={{ marginTop: 'env(safe-area-inset-top)' }}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Day info */}
        <div className={`transform transition-all duration-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="text-white/70 text-xs font-medium uppercase tracking-wide">
            Day {dayData.day} of 7
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">{dayData.title}</h1>
          <p className="text-white/80 text-sm mt-1">{dayData.theme}</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>Progress</span>
              <span>{completedCount}/{dayData.tasks.length} completed</span>
            </div>
            <div className="bg-black/20 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${allCompleted ? 'bg-green-400' : 'bg-white'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className={`p-4 transform transition-all duration-300 delay-100 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Description */}
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            {dayData.description}
          </p>

          {/* Tasks */}
          <div className="space-y-3 mb-5">
            {dayData.tasks.map((task, index) => {
              const isCompleted = completedTaskIds.includes(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`
                    w-full text-left p-4 rounded-2xl transition-all duration-200
                    active:scale-[0.98]
                    ${isCompleted
                      ? 'bg-green-500/20 border-2 border-green-500/50'
                      : 'bg-gray-800 border-2 border-gray-700'}
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className={`
                      w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      transition-all duration-200
                      ${isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-500'}
                    `}>
                      {isCompleted && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{task.icon}</span>
                        <span className={`font-semibold text-white ${isCompleted ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </span>
                      </div>
                      <p className={`text-gray-400 text-sm leading-relaxed ${isCompleted ? 'line-through opacity-50' : ''}`}>
                        {task.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-gray-500 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {task.duration}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tip */}
          <div className="bg-gray-800/50 rounded-2xl p-4 mb-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Pro Tip</span>
                <p className="text-gray-300 text-sm mt-1">{dayData.tip}</p>
              </div>
            </div>
          </div>

          {/* Completion celebration */}
          {allCompleted && (
            <div className="bg-green-500/20 rounded-2xl p-5 text-center border-2 border-green-500/40 mb-5">
              <span className="text-4xl mb-2 block">🎉</span>
              <p className="text-green-400 font-bold text-lg">Day {dayData.day} Complete!</p>
              <p className="text-green-300/80 text-sm mt-1">Amazing work! Keep the momentum going.</p>
            </div>
          )}

          {/* Bottom padding for safe area */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
