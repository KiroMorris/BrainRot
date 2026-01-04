"use client";

import { useState, useEffect } from "react";
import { recoveryProgram } from "./data/brainrot";
import DayCard from "./components/DayCard";
import DayModal from "./components/DayModal";
import FloatingQuote from "./components/FloatingQuote";

interface ProgressData {
  currentDay: number;
  completedTasks: string[];
  startDate: string | null;
}

const defaultProgress: ProgressData = {
  currentDay: 1,
  completedTasks: [],
  startDate: null,
};

export default function Home() {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("brainrot-recovery");
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      const newProgress = { ...defaultProgress, startDate: new Date().toISOString() };
      setProgress(newProgress);
      localStorage.setItem("brainrot-recovery", JSON.stringify(newProgress));
    }
  }, []);

  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress);
    localStorage.setItem("brainrot-recovery", JSON.stringify(newProgress));
  };

  const toggleTask = (taskId: string) => {
    const newCompletedTasks = progress.completedTasks.includes(taskId)
      ? progress.completedTasks.filter((id) => id !== taskId)
      : [...progress.completedTasks, taskId];

    const currentDayData = recoveryProgram.find((d) => d.day === progress.currentDay);
    if (currentDayData) {
      const currentDayTaskIds = currentDayData.tasks.map((t) => t.id);
      const allCurrentDayCompleted = currentDayTaskIds.every((id) =>
        newCompletedTasks.includes(id)
      );

      let newCurrentDay = progress.currentDay;
      if (allCurrentDayCompleted && progress.currentDay < 7) {
        newCurrentDay = progress.currentDay + 1;
      }

      saveProgress({
        ...progress,
        completedTasks: newCompletedTasks,
        currentDay: newCurrentDay,
      });
    } else {
      saveProgress({ ...progress, completedTasks: newCompletedTasks });
    }
  };

  const resetProgress = () => {
    if (confirm("Reset all progress?")) {
      const newProgress = { ...defaultProgress, startDate: new Date().toISOString() };
      saveProgress(newProgress);
    }
  };

  const selectedDayData = selectedDay
    ? recoveryProgram.find((d) => d.day === selectedDay)
    : null;

  const totalTasks = recoveryProgram.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTasksCount = progress.completedTasks.length;
  const overallProgress = Math.round((completedTasksCount / totalTasks) * 100);

  const getDayCompletedTasks = (day: number) => {
    const dayData = recoveryProgram.find((d) => d.day === day);
    if (!dayData) return 0;
    return dayData.tasks.filter((t) => progress.completedTasks.includes(t.id)).length;
  };

  const isDayCompleted = (day: number) => {
    const dayData = recoveryProgram.find((d) => d.day === day);
    if (!dayData) return false;
    return dayData.tasks.every((t) => progress.completedTasks.includes(t.id));
  };

  const completedDays = recoveryProgram.filter((d) => isDayCompleted(d.day)).length;
  const currentDayTasks = recoveryProgram[progress.currentDay - 1]?.tasks.length || 0;
  const currentDayCompleted = getDayCompletedTasks(progress.currentDay);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-slate-900 pointer-events-none" />

      <div className="relative z-10 px-4 py-6 pb-28 max-w-2xl mx-auto">
        {/* Compact Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
            7 Days to Clear Brain Rot
          </h1>
          <p className="text-gray-500 text-sm mt-1 hidden sm:block">
            Evidence-based recovery program
          </p>
        </header>

        {/* Main CTA - Current Day Card */}
        <button
          onClick={() => setSelectedDay(progress.currentDay)}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 mb-6 text-left active:scale-[0.98] transition-transform shadow-lg shadow-emerald-900/20"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-emerald-200 text-xs font-medium uppercase tracking-wide">
                Day {progress.currentDay} of 7
              </span>
              <h2 className="text-xl font-bold text-white">
                {recoveryProgram[progress.currentDay - 1]?.title}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-2xl font-bold">{currentDayCompleted}/{currentDayTasks}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-black/20 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="h-full bg-white/90 transition-all duration-500 rounded-full"
              style={{ width: `${(currentDayCompleted / currentDayTasks) * 100}%` }}
            />
          </div>
          <p className="text-emerald-100 text-sm">
            Tap to view today's tasks
          </p>
        </button>

        {/* Stats Row - Compact */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/80 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">{completedDays}</div>
            <div className="text-gray-500 text-xs">Days Done</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-teal-400">{completedTasksCount}</div>
            <div className="text-gray-500 text-xs">Tasks Done</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-cyan-400">{overallProgress}%</div>
            <div className="text-gray-500 text-xs">Complete</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Day Cards - Horizontal Scroll on Mobile */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">All Days</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {recoveryProgram.map((day) => (
              <div key={day.day} className="snap-start flex-shrink-0 w-[140px] sm:w-auto sm:flex-1">
                <DayCard
                  dayData={day}
                  isActive={day.day === progress.currentDay}
                  isCompleted={isDayCompleted(day.day)}
                  completedTasks={getDayCompletedTasks(day.day)}
                  totalTasks={day.tasks.length}
                  onClick={() => setSelectedDay(day.day)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-800/60 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <h3 className="font-semibold text-sm">Rewire Your Brain</h3>
              <p className="text-gray-500 text-xs mt-0.5">Reset dopamine and rebuild attention span</p>
            </div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">📵</span>
            <div>
              <h3 className="font-semibold text-sm">Digital Detox</h3>
              <p className="text-gray-500 text-xs mt-0.5">Break the doom-scrolling cycle</p>
            </div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-sm">Build Focus</h3>
              <p className="text-gray-500 text-xs mt-0.5">Develop deep work habits</p>
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {completedDays === 7 && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-center mb-6">
            <span className="text-5xl mb-3 block">🏆</span>
            <h2 className="text-2xl font-bold mb-2">Program Complete!</h2>
            <p className="text-emerald-100 text-sm">
              You did it! Keep these habits going.
            </p>
          </div>
        )}

        {/* Reset */}
        <div className="text-center pt-4">
          <button
            onClick={resetProgress}
            className="text-gray-600 text-xs active:text-gray-400 transition-colors py-2 px-4"
          >
            Reset Progress
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-xs">
          <p>Based on neuroscience research</p>
        </footer>
      </div>

      {/* Modal */}
      {selectedDayData && (
        <DayModal
          dayData={selectedDayData}
          completedTaskIds={progress.completedTasks}
          onToggleTask={toggleTask}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* Floating Quote - Hidden on mobile when modal is open */}
      {!selectedDayData && <FloatingQuote />}
    </div>
  );
}
