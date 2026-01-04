"use client";

import { useState, useEffect } from "react";
import { brainRotDays } from "./data/brainrot";
import DayCard from "./components/DayCard";
import DayModal from "./components/DayModal";
import FloatingQuote from "./components/FloatingQuote";

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [totalRotLevel, setTotalRotLevel] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem("brainrot-day");
    if (saved) {
      setCurrentDay(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    // Calculate total rot level based on current day
    const rot = brainRotDays
      .filter((d) => d.day <= currentDay)
      .reduce((acc, d) => acc + d.rotLevel, 0) / 7;
    setTotalRotLevel(Math.round(rot));
  }, [currentDay]);

  const progressToNextDay = () => {
    if (currentDay < 7) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      localStorage.setItem("brainrot-day", newDay.toString());
    }
  };

  const resetProgress = () => {
    setCurrentDay(1);
    localStorage.setItem("brainrot-day", "1");
  };

  const selectedDayData = selectedDay
    ? brainRotDays.find((d) => d.day === selectedDay)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
            7 DAYS OF BRAIN ROT
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Track your descent into internet madness. From Skibidi Toilet to full sigma grindset.
          </p>

          {/* Total Rot Meter */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Total Brain Rot</span>
              <span>{totalRotLevel}%</span>
            </div>
            <div className="bg-gray-800 rounded-full h-6 overflow-hidden border border-gray-700">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 transition-all duration-1000"
                style={{ width: `${totalRotLevel}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Normal Person</span>
              <span>Peak Brainrot</span>
            </div>
          </div>
        </header>

        {/* Current Day Banner */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-2 text-lg font-bold shadow-lg">
            Currently on Day {currentDay} of 7
          </div>
        </div>

        {/* Day Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {brainRotDays.map((day) => (
            <DayCard
              key={day.day}
              dayData={day}
              isActive={day.day === currentDay}
              isUnlocked={day.day <= currentDay}
              onClick={() => day.day <= currentDay && setSelectedDay(day.day)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={progressToNextDay}
            disabled={currentDay >= 7}
            className={`
              px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
              ${currentDay >= 7
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-green-500/25'}
            `}
          >
            {currentDay >= 7 ? "Max Rot Achieved!" : "Progress to Next Day"}
          </button>

          <button
            onClick={resetProgress}
            className="px-6 py-3 rounded-full font-medium text-gray-400 border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300"
          >
            Reset Progress
          </button>
        </div>

        {/* Achievement Banner */}
        {currentDay === 7 && (
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-8 text-center shadow-2xl animate-pulse">
            <span className="text-6xl mb-4 block">🏆</span>
            <h2 className="text-3xl font-bold mb-2">MAXIMUM BRAINROT ACHIEVED</h2>
            <p className="text-white/80">
              Congratulations! You have successfully rotted your brain.
              You now speak fluent internet and can identify any Skibidi Toilet episode by sound alone.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-4xl mb-3 block">🎯</span>
            <h3 className="font-bold text-xl mb-2">Track Progress</h3>
            <p className="text-gray-400">Follow your 7-day journey from normie to certified brainrot enjoyer.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-4xl mb-3 block">💬</span>
            <h3 className="font-bold text-xl mb-2">Learn the Slang</h3>
            <p className="text-gray-400">Master essential vocabulary: skibidi, rizz, gyatt, sigma, and more.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <span className="text-4xl mb-3 block">🧠</span>
            <h3 className="font-bold text-xl mb-2">Embrace the Rot</h3>
            <p className="text-gray-400">Accept your fate and become one with the algorithm.</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Made with 🧠💀 and too much internet</p>
          <p className="mt-1">No cap, this is fr fr bussin</p>
        </footer>
      </div>

      {/* Modal */}
      {selectedDayData && (
        <DayModal
          dayData={selectedDayData}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* Floating Quote */}
      <FloatingQuote />
    </div>
  );
}
