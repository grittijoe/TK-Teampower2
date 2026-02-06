export interface Question {
  id: number;
  text: string;
  category: "Können" | "Zusammenspiel" | "Energie";
}

export const questions: Question[] = [
  // Können (Ability/Skills) - Questions 1-5
  {
    id: 1,
    text: "Unser Team verfügt über die notwendigen Fachkenntnisse und Fertigkeiten, um unsere Aufgaben erfolgreich zu bewältigen.",
    category: "Können",
  },
  {
    id: 2,
    text: "Die Mitglieder unseres Teams bringen unterschiedliche Kompetenzen mit, die sich ergänzen.",
    category: "Können",
  },
  {
    id: 3,
    text: "Unser Team investiert regelmäßig in die Weiterentwicklung der Fähigkeiten seiner Mitglieder.",
    category: "Können",
  },
  {
    id: 4,
    text: "Wir haben klare Prozesse und Arbeitsabläufe, die effizient umgesetzt werden.",
    category: "Können",
  },
  {
    id: 5,
    text: "Die Qualität unserer Arbeitsergebnisse entspricht den hohen Standards, die wir uns setzen.",
    category: "Können",
  },

  // Zusammenspiel (Teamwork/Collaboration) - Questions 6-11
  {
    id: 6,
    text: "Unser Team kommuniziert offen, ehrlich und konstruktiv miteinander.",
    category: "Zusammenspiel",
  },
  {
    id: 7,
    text: "Wir unterstützen uns gegenseitig und helfen, wenn jemand Hilfe braucht.",
    category: "Zusammenspiel",
  },
  {
    id: 8,
    text: "Konflikte werden in unserem Team als Chance zur Verbesserung betrachtet und konstruktiv gelöst.",
    category: "Zusammenspiel",
  },
  {
    id: 9,
    text: "Es herrscht ein hohes Maß an Vertrauen zwischen den Mitgliedern unseres Teams.",
    category: "Zusammenspiel",
  },
  {
    id: 10,
    text: "Wir arbeiten an gemeinsamen Zielen hin und verfolgen nicht nur Einzelinteressen.",
    category: "Zusammenspiel",
  },
  {
    id: 11,
    text: "Jedes Mitglied fühlt sich als vollwertiger Teil des Teams und wird wertgeschätzt.",
    category: "Zusammenspiel",
  },

  // Energie (Energy/Drive) - Questions 12-15
  {
    id: 12,
    text: "Unser Team ist motiviert und engagiert in der Verfolgung unserer Ziele.",
    category: "Energie",
  },
  {
    id: 13,
    text: "Wir strahlen Positiv­ität und Optimismus aus und übertragen dies auf andere.",
    category: "Energie",
  },
  {
    id: 14,
    text: "Unser Team hat die Kraft und Ausdauer, auch Herausforderungen zu meistern.",
    category: "Energie",
  },
  {
    id: 15,
    text: "Wir sind bereit, innovative Lösungen auszuprobieren und uns weiterzuentwickeln.",
    category: "Energie",
  },
];

export const categoryInfo = {
  Können: {
    color: "from-blue-600 to-blue-400",
    icon: "⚙️",
    description: "Fachkompetenz und Fähigkeiten",
  },
  Zusammenspiel: {
    color: "from-purple-600 to-purple-400",
    icon: "🤝",
    description: "Zusammenarbeit und Kommunikation",
  },
  Energie: {
    color: "from-orange-600 to-orange-400",
    icon: "⚡",
    description: "Motivation und Antrieb",
  },
};
