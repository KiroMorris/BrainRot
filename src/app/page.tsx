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
      // Set start date on first visit
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

    // Check if current day is completed
    const currentDayData = recoveryProgram.find((d) => d.day === progress.currentDay);
    if (currentDayData) {
      const currentDayTaskIds = currentDayData.tasks.map((t) => t.id);
      const allCurrentDayCompleted = currentDayTaskIds.every((id) =>
        newCompletedTasks.includes(id)
      );

      // Auto-advance to next day if all tasks completed
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
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      const newProgress = { ...defaultProgress, startDate: new Date().toISOString() };
      saveProgress(newProgress);
    }
  };

  const selectedDayData = selectedDay
    ? recoveryProgram.find((d) => d.day === selectedDay)
    : null;

  // Calculate stats
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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
            7 Days to Clear Brain Rot
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Evidence-based recovery program to reclaim your focus, attention, and mental clarity.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-emerald-400">{progress.currentDay}</div>
            <div className="text-gray-400 text-sm">Current Day</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-teal-400">{completedTasksCount}</div>
            <div className="text-gray-400 text-sm">Tasks Done</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-cyan-400">{completedDays}</div>
            <div className="text-gray-400 text-sm">Days Complete</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-400">{overallProgress}%</div>
            <div className="text-gray-400 text-sm">Overall Progress</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Recovery Progress</span>
            <span>{overallProgress}% Complete</span>
          </div>
          <div className="bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Current Day Highlight */}
        <div className="text-center mb-8">
          <button
            onClick={() => setSelectedDay(progress.currentDay)}
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg">Start Day {progress.currentDay} Tasks</span>
            <span className="block text-sm text-white/70 mt-1">
              {recoveryProgram[progress.currentDay - 1]?.title}
            </span>
          </button>
        </div>

        {/* Day Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
          {recoveryProgram.map((day) => (
            <DayCard
              key={day.day}
              dayData={day}
              isActive={day.day === progress.currentDay}
              isCompleted={isDayCompleted(day.day)}
              completedTasks={getDayCompletedTasks(day.day)}
              totalTasks={day.tasks.length}
              onClick={() => setSelectedDay(day.day)}
            />
          ))}
        </div>

        {/* Program Benefits */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-3xl mb-3 block">🧠</span>
            <h3 className="font-bold text-lg mb-2">Rewire Your Brain</h3>
            <p className="text-gray-400 text-sm">Reset your dopamine receptors and rebuild your attention span through proven methods.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-3xl mb-3 block">📵</span>
            <h3 className="font-bold text-lg mb-2">Digital Detox</h3>
            <p className="text-gray-400 text-sm">Gradually reduce screen time and break the doom-scrolling cycle.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-3xl mb-3 block">🎯</span>
            <h3 className="font-bold text-lg mb-2">Build Focus</h3>
            <p className="text-gray-400 text-sm">Develop deep work habits and reclaim your ability to concentrate.</p>
          </div>
        </div>

        {/* Completion Banner */}
        {completedDays === 7 && (
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center shadow-2xl mb-10">
            <span className="text-6xl mb-4 block">🏆</span>
            <h2 className="text-3xl font-bold mb-2">PROGRAM COMPLETE!</h2>
            <p className="text-white/90">
              You did it! You've completed all 7 days. Your brain is healing.
              Keep these habits going and enjoy your newfound focus and clarity.
            </p>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetProgress}
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            Reset Progress
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Based on neuroscience research and evidence-based recovery methods</p>
          <p className="mt-1">Your brain is plastic. You can reshape it.</p>
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

      {/* Floating Quote */}
      <FloatingQuote />
    </div>
  );
}
