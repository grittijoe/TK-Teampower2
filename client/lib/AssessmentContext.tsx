import React, { createContext, useContext, useState } from "react";

interface AssessmentContextType {
  answers: Record<number, number>; // question id -> score (1-5)
  setAnswer: (questionId: number, score: number) => void;
  resetAnswers: () => void;
  calculateScore: () => {
    scoreKönnen: number;
    scoreZusammenspiel: number;
    scoreEnergie: number;
    finalScore: number;
    avgKönnen: number;
    avgZusammenspiel: number;
    avgEnergie: number;
  } | null;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined,
);

export function AssessmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const setAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const resetAnswers = () => {
    setAnswers({});
  };

  const calculateScore = () => {
    // Check if all 15 questions are answered
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < 15) return null;

    // Extract answers for each category
    const koennenAnswers = [1, 2, 3, 4, 5].map((id) => answers[id]);
    const zusammenspielAnswers = [6, 7, 8, 9, 10, 11].map((id) => answers[id]);
    const energieAnswers = [12, 13, 14, 15].map((id) => answers[id]);

    // Calculate averages
    const avgKönnen =
      koennenAnswers.reduce((a, b) => a + b, 0) / koennenAnswers.length;
    const avgZusammenspiel =
      zusammenspielAnswers.reduce((a, b) => a + b, 0) /
      zusammenspielAnswers.length;
    const avgEnergie =
      energieAnswers.reduce((a, b) => a + b, 0) / energieAnswers.length;

    // Apply new formula: (average - 1) / 4 * 100
    // Converts 1-5 scale to 0-100 percentage scale
    const scoreKönnen = ((avgKönnen - 1) / 4) * 100;
    const scoreZusammenspiel = ((avgZusammenspiel - 1) / 4) * 100;
    const scoreEnergie = ((avgEnergie - 1) / 4) * 100;

    // Calculate final score as cube root of the product of category scores
    const finalScore = Math.cbrt(
      scoreKönnen * scoreZusammenspiel * scoreEnergie,
    );

    return {
      scoreKönnen,
      scoreZusammenspiel,
      scoreEnergie,
      finalScore,
      avgKönnen,
      avgZusammenspiel,
      avgEnergie,
    };
  };

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        setAnswer,
        resetAnswers,
        calculateScore,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within AssessmentProvider");
  }
  return context;
}
