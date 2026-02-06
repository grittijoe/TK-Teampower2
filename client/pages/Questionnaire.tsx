import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/lib/AssessmentContext";
import { questions, categoryInfo } from "@/lib/questions";

export default function Questionnaire() {
  const navigate = useNavigate();
  const { answers, setAnswer } = useAssessment();
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (Object.keys(answers).length < 15) {
      setError(true);
      return;
    }
    navigate("/results");
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / 15) * 100;

  const groupedQuestions = {
    Können: questions.filter((q) => q.category === "Können"),
    Zusammenspiel: questions.filter((q) => q.category === "Zusammenspiel"),
    Energie: questions.filter((q) => q.category === "Energie"),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">
              BITOU Teamkraft-Check
            </h1>
            <div className="text-sm text-muted-foreground">
              {answeredCount} / 15 Fragen beantwortet
            </div>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {Object.entries(groupedQuestions).map(
            ([category, categoryQuestions]) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              return (
                <section key={category} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-4xl">{info.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {category}
                      </h2>
                      <p className="text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {categoryQuestions.map((question) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        answer={answers[question.id]}
                        onAnswer={(score) => setAnswer(question.id, score)}
                      />
                    ))}
                  </div>
                </section>
              );
            },
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-accent/10 border border-accent/50 rounded-lg text-accent">
            Bitte beantworten Sie alle Fragen, bevor Sie fortfahren.
          </div>
        )}

        {/* Action Button */}
        <div className="mt-12 flex justify-between items-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-border text-muted-foreground hover:bg-secondary"
          >
            ← Zurück
          </Button>
          <Button
            onClick={handleContinue}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Ergebnisse anzeigen
            <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

interface QuestionCardProps {
  question: { id: number; text: string };
  answer?: number;
  onAnswer: (score: number) => void;
}

function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <p className="text-lg text-foreground flex-1">{question.text}</p>
        <span className="text-xs font-semibold text-muted-foreground ml-4 whitespace-nowrap">
          Frage {question.id}
        </span>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => onAnswer(score)}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
              answer === score
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary text-muted-foreground hover:bg-border"
            }`}
          >
            {score}
          </button>
        ))}
      </div>

      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>Stimme überhaupt nicht zu</span>
        <span>Stimme voll zu</span>
      </div>
    </div>
  );
}
