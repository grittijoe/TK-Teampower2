import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { categoryInfo } from "@/lib/questions";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">
            BITOU Teamkraft-Check
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Entdecken Sie die
                <span className="block text-primary">Kraft Ihres Teams</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Der BITOU Teamkraft-Check ist ein wissenschaftlich fundiertes
                Evaluierungstool, das die Stärken Ihres Teams in drei
                Dimensionen misst: Fachkompetenz, Zusammenarbeit und Energie.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Was wird bewertet?
              </h3>
              <div className="space-y-3">
                {Object.entries(categoryInfo).map(([key, info]) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-4 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors"
                  >
                    <span className="text-2xl mt-1">{info.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground">{key}</h4>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => navigate("/questionnaire")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Assessment starten
                <span className="ml-2">→</span>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Das Assessment dauert etwa 5-10 Minuten
              </p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 hover:bg-primary/15 transition-all">
                <div className="text-primary text-sm font-semibold mb-2">
                  ⚙️ Können
                </div>
                <div className="text-3xl font-bold text-foreground">
                  Fachkompetenz
                </div>
                <div className="text-muted-foreground text-sm mt-3">
                  Fachkenntnisse, Fertigkeiten und Qualität
                </div>
              </div>

              <div className="bg-gray-200 border border-gray-300 rounded-2xl p-8 hover:bg-gray-300 transition-all">
                <div className="text-primary text-sm font-semibold mb-2">
                  🤝 Zusammenspiel
                </div>
                <div className="text-3xl font-bold text-foreground">
                  Zusammenarbeit
                </div>
                <div className="text-muted-foreground text-sm mt-3">
                  Kommunikation, Vertrauen und Unterstützung
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 hover:bg-accent/15 transition-all">
                <div className="text-accent text-sm font-semibold mb-2">
                  ⚡ Energie
                </div>
                <div className="text-3xl font-bold text-foreground">
                  Antrieb
                </div>
                <div className="text-muted-foreground text-sm mt-3">
                  Motivation, Optimismus und Innovationskraft
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
