import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/lib/AssessmentContext";
import { categoryInfo } from "@/lib/questions";
import { Share2 } from "lucide-react";

interface ScoreData {
  scoreKönnen: number;
  scoreZusammenspiel: number;
  scoreEnergie: number;
  finalScore: number;
  avgKönnen: number;
  avgZusammenspiel: number;
  avgEnergie: number;
}

export default function Results() {
  const navigate = useNavigate();
  const { calculateScore, resetAnswers } = useAssessment();
  const [scores, setScores] = useState<ScoreData | null>(null);

  useEffect(() => {
    const result = calculateScore();
    if (!result) {
      navigate("/questionnaire");
      return;
    }
    setScores(result);
  }, [calculateScore, navigate]);

  if (!scores) {
    return null;
  }

  const getEvaluationLevel = (score: number) => {
    if (score <= 49)
      return {
        level: "Entwicklungsbedarf",
        color: "bg-accent/20 border-accent/50 text-accent",
      };
    if (score <= 65)
      return {
        level: "Basislevel",
        color: "bg-primary/10 border-primary/30 text-primary",
      };
    if (score <= 77)
      return {
        level: "Gutes Niveau",
        color: "bg-primary/15 border-primary/40 text-primary",
      };
    if (score <= 90)
      return {
        level: "Sehr gut",
        color: "bg-primary/20 border-primary/50 text-primary",
      };
    return {
      level: "Hervorragend",
      color: "bg-primary/25 border-primary/60 text-primary",
    };
  };

  const getFinalEvaluationLevel = (score: number) => {
    if (score <= 49) return "Entwicklungsbedarf";
    if (score <= 65) return "Basislevel";
    if (score <= 77) return "Gutes Niveau";
    if (score <= 90) return "Sehr gut";
    return "Hervorragend";
  };

  const handleRestart = () => {
    resetAnswers();
    navigate("/");
  };

  const avgKönnen = scores.avgKönnen;
  const avgZusammenspiel = scores.avgZusammenspiel;
  const avgEnergie = scores.avgEnergie;

  const handleShare = async () => {
    const resultsText = `BITOU Teamkraft-Check Ergebnisse
================================

Teamkraft-Index: ${scores.finalScore.toFixed(1)} / 100
Bewertung: ${getFinalEvaluationLevel(scores.finalScore)}

Kategorien:
- Können: ${scores.scoreKönnen.toFixed(1)} / 100 (Ø ${avgKönnen.toFixed(2)}/5)
- Zusammenspiel: ${scores.scoreZusammenspiel.toFixed(1)} / 100 (Ø ${avgZusammenspiel.toFixed(2)}/5)
- Energie: ${scores.scoreEnergie.toFixed(1)} / 100 (Ø ${avgEnergie.toFixed(2)}/5)

Copyright BITOU 2026
https://www.bitou.de/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BITOU Teamkraft-Check",
          text: resultsText,
        });
      } catch (err: any) {
        // Only fallback to download if there's an actual error, not if user cancelled
        if (err.name !== "AbortError") {
          console.error("Share error:", err);
        }
      }
    } else if (navigator.clipboard) {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(resultsText);
        alert("Ergebnisse in die Zwischenablage kopiert!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const downloadResults = (resultsText: string) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(resultsText),
    );
    element.setAttribute(
      "download",
      `Teamkraft-Check_Ergebnisse_${new Date().toISOString().split("T")[0]}.txt`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-primary">
            BITOU Teamkraft-Check
          </h1>
          <p className="text-muted-foreground mt-1">Ihre Ergebnisse</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        {/* Final Score Card */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-12 mb-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            Ihr Teamkraft-Index
          </p>
          <div className="text-7xl font-bold text-primary mb-4">
            {scores.finalScore.toFixed(1)}
          </div>
          <p className="text-2xl font-semibold text-foreground mb-6">
            {getFinalEvaluationLevel(scores.finalScore)}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dieser Wert gibt Ihnen einen Überblick über die Gesamtkraft Ihres
            Teams. Je höher der Wert, desto ausgeprägter sind Ihre
            Teamkompetenzen insgesamt.
          </p>
        </div>

        {/* Category Details */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              key: "Können" as const,
              score: scores.scoreKönnen,
              avg: avgKönnen,
            },
            {
              key: "Zusammenspiel" as const,
              score: scores.scoreZusammenspiel,
              avg: avgZusammenspiel,
            },
            {
              key: "Energie" as const,
              score: scores.scoreEnergie,
              avg: avgEnergie,
            },
          ].map(({ key, score, avg }) => {
            const info = categoryInfo[key];
            const evaluation = getEvaluationLevel(score);

            return (
              <div
                key={key}
                className="bg-white border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{info.icon}</span>
                  <h3 className="text-xl font-bold text-foreground">{key}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">
                      Durchschnittswert
                    </p>
                    <p className="text-4xl font-bold text-primary">
                      {avg.toFixed(2)} / 5
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm mb-2">
                      Teamkraft-Score
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {score.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div
                      className={`px-3 py-2 rounded-lg border ${evaluation.color}`}
                    >
                      <p className="text-sm font-semibold">
                        {evaluation.level}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculation Explanation */}
        <div className="bg-white border border-border rounded-xl p-6 mb-12">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Wie wird der Teamkraft-Index berechnet?
          </h3>
          <div className="space-y-3 text-foreground text-sm">
            <p>
              <span className="font-semibold">Schritt 1:</span> Durchschnitt
              jeder Kategorie berechnen
            </p>
            <div className="ml-4 space-y-1 font-mono text-xs bg-secondary p-3 rounded border border-border">
              <p>
                Können: {avgKönnen.toFixed(2)} (Durchschnitt von Fragen 1-5)
              </p>
              <p>
                Zusammenspiel: {avgZusammenspiel.toFixed(2)} (Durchschnitt von
                Fragen 6-11)
              </p>
              <p>
                Energie: {avgEnergie.toFixed(2)} (Durchschnitt von Fragen 12-15)
              </p>
            </div>

            <p className="pt-2">
              <span className="font-semibold">Schritt 2:</span> Formel anwenden:
              (Durchschnitt - 1) / 4 × 100
            </p>
            <div className="ml-4 space-y-1 font-mono text-xs bg-secondary p-3 rounded border border-border">
              <p>
                Können: ({avgKönnen.toFixed(2)} - 1) / 4 × 100 ={" "}
                {scores.scoreKönnen.toFixed(1)}
              </p>
              <p>
                Zusammenspiel: ({avgZusammenspiel.toFixed(2)} - 1) / 4 × 100 ={" "}
                {scores.scoreZusammenspiel.toFixed(1)}
              </p>
              <p>
                Energie: ({avgEnergie.toFixed(2)} - 1) / 4 × 100 ={" "}
                {scores.scoreEnergie.toFixed(1)}
              </p>
            </div>

            <p className="pt-2">
              <span className="font-semibold">Schritt 3:</span> Kubikwurzel des
              Produkts berechnen
            </p>
            <div className="ml-4 space-y-1 font-mono text-xs bg-secondary p-3 rounded border border-border">
              <p>
                ∛({scores.scoreKönnen.toFixed(1)} ×{" "}
                {scores.scoreZusammenspiel.toFixed(1)} ×{" "}
                {scores.scoreEnergie.toFixed(1)}) ={" "}
                {scores.finalScore.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={handleRestart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-lg transition-all"
          >
            Neues Assessment
          </Button>
          <Button
            onClick={() => {
              const resultsText = `BITOU Teamkraft-Check Ergebnisse
================================

Teamkraft-Index: ${scores.finalScore.toFixed(1)} / 100
Bewertung: ${getFinalEvaluationLevel(scores.finalScore)}

Kategorien:
- Können: ${scores.scoreKönnen.toFixed(1)} / 100 (Ø ${avgKönnen.toFixed(2)}/5)
- Zusammenspiel: ${scores.scoreZusammenspiel.toFixed(1)} / 100 (Ø ${avgZusammenspiel.toFixed(2)}/5)
- Energie: ${scores.scoreEnergie.toFixed(1)} / 100 (Ø ${avgEnergie.toFixed(2)}/5)

Copyright BITOU 2026
https://www.bitou.de/`;
              const element = document.createElement("a");
              element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," +
                  encodeURIComponent(resultsText),
              );
              element.setAttribute(
                "download",
                `Teamkraft-Check_Ergebnisse_${new Date().toISOString().split("T")[0]}.txt`,
              );
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/5 font-semibold py-6 rounded-lg transition-all"
          >
            Herunterladen
          </Button>
          <Button
            onClick={handleShare}
            size="lg"
            className="border border-accent text-accent hover:bg-accent/5 font-semibold py-6 rounded-lg transition-all"
            variant="outline"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Teilen
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">Copyright BITOU 2026</p>
          <a
            href="https://www.bitou.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            www.bitou.de
          </a>
        </div>
      </footer>
    </div>
  );
}
