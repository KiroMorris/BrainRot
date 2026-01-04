export interface BrainRotDay {
  day: number;
  title: string;
  description: string;
  symptoms: string[];
  slang: string[];
  rotLevel: number; // 1-100
  emoji: string;
  color: string;
}

export const brainRotDays: BrainRotDay[] = [
  {
    day: 1,
    title: "The Awakening",
    description: "You discovered your first skibidi toilet video. There's no going back now.",
    symptoms: ["Slight confusion", "Mild curiosity", "One eyebrow raised"],
    slang: ["skibidi", "ohio", "rizz"],
    rotLevel: 15,
    emoji: "🤨",
    color: "from-green-400 to-green-600",
  },
  {
    day: 2,
    title: "The Descent",
    description: "You're starting to understand the lore. Cameraman vs Skibidi - you've picked a side.",
    symptoms: ["Humming the skibidi tune", "Using 'rizz' unironically", "TikTok algorithm shifting"],
    slang: ["fanum tax", "gyatt", "sigma"],
    rotLevel: 30,
    emoji: "😵",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    day: 3,
    title: "No Cap Fr Fr",
    description: "Your vocabulary has fundamentally changed. Every sentence needs slang.",
    symptoms: ["Calling things 'bussin'", "Rating everything's rizz", "Dreams of Ohio"],
    slang: ["no cap", "fr fr", "bussin", "slay"],
    rotLevel: 45,
    emoji: "🧠",
    color: "from-orange-400 to-orange-600",
  },
  {
    day: 4,
    title: "The Mewing Phase",
    description: "You've discovered looksmaxxing content. Mewing in every photo.",
    symptoms: ["Constant mewing", "Jawline obsession", "Saying 'mog' to strangers"],
    slang: ["mewing", "looksmax", "mog", "aura"],
    rotLevel: 60,
    emoji: "💀",
    color: "from-red-400 to-red-600",
  },
  {
    day: 5,
    title: "Sigma Grindset",
    description: "You wake up at 4 AM to 'grind'. You listen to phonk while walking.",
    symptoms: ["Quoting Patrick Bateman", "Phonk playlist on repeat", "Lone wolf mentality"],
    slang: ["grindset", "alpha", "beta", "based"],
    rotLevel: 75,
    emoji: "🐺",
    color: "from-purple-400 to-purple-600",
  },
  {
    day: 6,
    title: "Only in Ohio",
    description: "Reality feels like an Ohio meme. Everything is sus and sussy.",
    symptoms: ["Seeing amogus everywhere", "Trust issues", "Speaking only in memes"],
    slang: ["sus", "sussy baka", "imposter", "amogus"],
    rotLevel: 90,
    emoji: "📮",
    color: "from-pink-400 to-pink-600",
  },
  {
    day: 7,
    title: "Maximum Brainrot",
    description: "Congratulations! Your brain has achieved maximum rot. You are now one with the internet.",
    symptoms: ["Full skibidi transformation", "Speaking only in slang", "Ascended meme lord"],
    slang: ["skibidi dop dop", "toilet", "yes yes yes", "🗿"],
    rotLevel: 100,
    emoji: "🚽",
    color: "from-violet-400 to-fuchsia-600",
  },
];

export const randomQuotes = [
  "That's not very sigma of you",
  "You just lost 1000 aura points",
  "Only in Ohio fr fr",
  "Skibidi dop dop dop yes yes",
  "No cap, this is bussin",
  "Your rizz is showing",
  "That's lowkey sus",
  "Fanum tax activated",
  "GYATT! Look at that rotted brain",
  "You're mewing wrong",
  "W + ratio + you fell off",
  "This ain't it chief",
  "Bro really said that 💀",
  "Living rent free in your head",
  "Tell me you're gen alpha without telling me",
];
