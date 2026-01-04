export interface Task {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export interface RecoveryDay {
  day: number;
  title: string;
  theme: string;
  description: string;
  tasks: Task[];
  tip: string;
  color: string;
}

export const recoveryProgram: RecoveryDay[] = [
  {
    day: 1,
    title: "The Awakening",
    theme: "Awareness & First Detox",
    description: "Recognize the problem and take your first step. Today is about becoming aware of your habits and starting small.",
    tasks: [
      {
        id: "1-1",
        title: "Track your screen time",
        description: "Check your phone's screen time stats. Write down the number.",
        duration: "2 min",
        icon: "📱",
      },
      {
        id: "1-2",
        title: "1-hour phone-free block",
        description: "Put your phone in another room for 1 full hour. No cheating.",
        duration: "60 min",
        icon: "🚫",
      },
      {
        id: "1-3",
        title: "Drink 2L of water",
        description: "Hydration supports brain function. Track your intake today.",
        duration: "All day",
        icon: "💧",
      },
      {
        id: "1-4",
        title: "10-minute walk outside",
        description: "No headphones. Just you and your thoughts. Observe nature.",
        duration: "10 min",
        icon: "🚶",
      },
    ],
    tip: "Your brain is desensitized to dopamine. Today we start resetting it.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    day: 2,
    title: "Digital Boundaries",
    theme: "Create Phone-Free Zones",
    description: "Establish physical and time boundaries. Your environment shapes your behavior.",
    tasks: [
      {
        id: "2-1",
        title: "No phone first 30 min after waking",
        description: "Let your cortisol naturally wake you up. Don't start in reactive mode.",
        duration: "30 min",
        icon: "🌅",
      },
      {
        id: "2-2",
        title: "Turn on grayscale mode",
        description: "Remove color from your phone. Colors trigger dopamine. Go boring.",
        duration: "2 min",
        icon: "⬛",
      },
      {
        id: "2-3",
        title: "Disable non-essential notifications",
        description: "Keep only calls/messages. Kill social media notifications.",
        duration: "5 min",
        icon: "🔕",
      },
      {
        id: "2-4",
        title: "20-minute outdoor walk",
        description: "Nature exposure rejuvenates your prefrontal cortex.",
        duration: "20 min",
        icon: "🌳",
      },
    ],
    tip: "Each notification hijacks your attention. Take back control.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    day: 3,
    title: "Move Your Body",
    theme: "Exercise & Physical Reset",
    description: "Physical activity promotes neurogenesis and boosts BDNF - critical for learning and memory.",
    tasks: [
      {
        id: "3-1",
        title: "20-min exercise session",
        description: "HIIT, running, cycling, or dancing. Get your heart rate up.",
        duration: "20 min",
        icon: "💪",
      },
      {
        id: "3-2",
        title: "No phone for 2 hours",
        description: "Extend yesterday's phone-free time. Your brain is adapting.",
        duration: "2 hours",
        icon: "📵",
      },
      {
        id: "3-3",
        title: "Replace scrolling with reading",
        description: "Read a physical book for 15 minutes instead of your phone.",
        duration: "15 min",
        icon: "📖",
      },
      {
        id: "3-4",
        title: "Cold shower finish",
        description: "End your shower with 30 seconds of cold water. Dopamine reset.",
        duration: "30 sec",
        icon: "🚿",
      },
    ],
    tip: "Exercise improves memory and focus more than any app ever will.",
    color: "from-orange-500 to-red-600",
  },
  {
    day: 4,
    title: "Mindfulness Day",
    theme: "Meditation & Mental Clarity",
    description: "Train your attention. Meditation enhances focus, lowers anxiety, and rebuilds concentration.",
    tasks: [
      {
        id: "4-1",
        title: "10-minute meditation",
        description: "Sit quietly. Focus on breath. When mind wanders, return to breath.",
        duration: "10 min",
        icon: "🧘",
      },
      {
        id: "4-2",
        title: "Journaling session",
        description: "Write 1 page about how you feel. No filter. Just write.",
        duration: "10 min",
        icon: "📝",
      },
      {
        id: "4-3",
        title: "No social media today",
        description: "Full 24-hour break from all social platforms. You can do this.",
        duration: "24 hours",
        icon: "🚷",
      },
      {
        id: "4-4",
        title: "30-minute nature walk",
        description: "Longer outdoor exposure. Leave phone at home if possible.",
        duration: "30 min",
        icon: "🏞️",
      },
    ],
    tip: "Your attention is your superpower. Meditation is the gym for it.",
    color: "from-purple-500 to-violet-600",
  },
  {
    day: 5,
    title: "Brain Food",
    theme: "Nutrition & Sleep Reset",
    description: "What you eat affects how you think. Omega-3s, antioxidants, and proper sleep repair your brain.",
    tasks: [
      {
        id: "5-1",
        title: "Eat brain-healthy foods",
        description: "Include: salmon/walnuts (omega-3), berries (antioxidants), or avocado.",
        duration: "Meals",
        icon: "🥗",
      },
      {
        id: "5-2",
        title: "No screens 1 hour before bed",
        description: "Read a book, journal, or just sit. Let melatonin do its job.",
        duration: "1 hour",
        icon: "🌙",
      },
      {
        id: "5-3",
        title: "8 hours of sleep tonight",
        description: "Sleep resets dopamine balance. This is non-negotiable.",
        duration: "8 hours",
        icon: "😴",
      },
      {
        id: "5-4",
        title: "15-minute meditation",
        description: "Building on yesterday. You're getting stronger.",
        duration: "15 min",
        icon: "🧘",
      },
    ],
    tip: "7-8 hours of sleep resets your dopamine. Don't skip this.",
    color: "from-pink-500 to-rose-600",
  },
  {
    day: 6,
    title: "Deep Work",
    theme: "Reclaim Your Focus",
    description: "Put your recovering brain to work. Practice sustained attention on meaningful tasks.",
    tasks: [
      {
        id: "6-1",
        title: "90-minute deep work block",
        description: "Work on something meaningful. No phone. No distractions. Full focus.",
        duration: "90 min",
        icon: "🎯",
      },
      {
        id: "6-2",
        title: "Learn something new",
        description: "Spend 30 min learning a skill: instrument, language, coding, art.",
        duration: "30 min",
        icon: "🎓",
      },
      {
        id: "6-3",
        title: "Call someone instead of texting",
        description: "Real human connection. Have an actual conversation.",
        duration: "15 min",
        icon: "📞",
      },
      {
        id: "6-4",
        title: "Evening reflection",
        description: "Journal about your week. What changed? How do you feel?",
        duration: "10 min",
        icon: "✍️",
      },
    ],
    tip: "Your brain can focus again. Today you prove it to yourself.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    day: 7,
    title: "Full Reset",
    theme: "Complete Digital Detox Day",
    description: "The final challenge. A full day to prove you're in control, not your phone.",
    tasks: [
      {
        id: "7-1",
        title: "Full-day digital detox",
        description: "No phone, no social media, no mindless browsing. Emergency calls only.",
        duration: "All day",
        icon: "🔌",
      },
      {
        id: "7-2",
        title: "Outdoor activity",
        description: "Hike, bike, swim, play sports. Spend at least 1 hour outside.",
        duration: "1+ hour",
        icon: "🏃",
      },
      {
        id: "7-3",
        title: "Creative activity",
        description: "Paint, play music, cook a new recipe, build something with your hands.",
        duration: "1 hour",
        icon: "🎨",
      },
      {
        id: "7-4",
        title: "Set your new habits",
        description: "Write down 3 habits you'll keep after this week. Make them stick.",
        duration: "15 min",
        icon: "📋",
      },
    ],
    tip: "You did it. Your brain is healing. Now maintain these habits.",
    color: "from-amber-500 to-yellow-600",
  },
];

export const motivationalQuotes = [
  "Your attention is your most valuable asset",
  "Small steps compound into massive change",
  "Every hour offline is an hour of healing",
  "You're rewiring your brain right now",
  "Discipline is choosing what you want most over what you want now",
  "Your future self will thank you",
  "Break the scroll. Build the focus.",
  "Dopamine from achievement > dopamine from scrolling",
  "You don't need notifications. They need you.",
  "Boredom is where creativity begins",
  "Your phone is a tool, not a master",
  "One day at a time. You've got this.",
  "The goal isn't perfection. It's progress.",
  "Real life happens offline",
  "Your brain is plastic. Reshape it.",
];
