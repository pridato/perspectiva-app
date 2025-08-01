import { AppNavigation } from "@/components/app-navigation"
import { PatternCard } from "@/components/mirror/pattern-card"
import { EmotionGraph } from "@/components/mirror/emotion-graph"
import { QuoteBubble } from "@/components/mirror/quote-bubble"
import { MirrorBox } from "@/components/mirror/mirror-box"
import { SessionEvolution } from "@/components/mirror/session-evolution"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data
const emotionData = [
  { emotion: "Ansiedad", percentage: 35, count: 12, color: "#ef4444", emoji: "😰" },
  { emotion: "Culpa", percentage: 25, count: 8, color: "#f97316", emoji: "😔" },
  { emotion: "Miedo", percentage: 20, count: 7, color: "#eab308", emoji: "😨" },
  { emotion: "Tristeza", percentage: 15, count: 5, color: "#3b82f6", emoji: "😢" },
  { emotion: "Esperanza", percentage: 5, count: 2, color: "#10b981", emoji: "🌟" },
]

const patterns = [
  {
    title: "Perfeccionismo Paralizante",
    description:
      "Tiendes a postergar decisiones importantes por miedo a no hacerlo perfecto. Este patrón aparece especialmente en contextos laborales y creativos.",
    intensity: "high" as const,
    type: "cognitive" as const,
    frequency: 8,
    examples: [
      "No puedo enviar este proyecto hasta que esté perfecto",
      "Prefiero no intentarlo si no estoy seguro del resultado",
    ],
  },
  {
    title: "Búsqueda de Validación Externa",
    description:
      "Frecuentemente buscas aprobación de otros antes de tomar decisiones personales importantes, especialmente de figuras de autoridad.",
    intensity: "medium" as const,
    type: "emotional" as const,
    frequency: 6,
    examples: ["¿Qué pensarán mis padres si hago esto?", "Necesito que alguien me diga que estoy haciendo lo correcto"],
  },
  {
    title: "Evitación de Conflictos",
    description:
      "Prefieres evitar conversaciones difíciles, lo que a veces genera más tensión a largo plazo en tus relaciones.",
    intensity: "medium" as const,
    type: "behavioral" as const,
    frequency: 5,
    examples: ["Es mejor no decir nada para evitar problemas", "Cambio de tema cuando la conversación se pone tensa"],
  },
]

const quotes = [
  {
    quote: "Siento que nunca es suficiente lo que hago",
    context: "Reflexión sobre logros profesionales",
    date: "15 Ene 2024",
    emotion: "ansiedad",
  },
  {
    quote: "¿Por qué siempre necesito que otros me digan que está bien?",
    context: "Dilema sobre decisión personal",
    date: "12 Ene 2024",
    emotion: "culpa",
  },
  {
    quote: "Prefiero quedarme callado que crear conflicto",
    context: "Situación familiar",
    date: "08 Ene 2024",
    emotion: "miedo",
  },
]

const evolutionData = [
  {
    date: "15 Ene 2024",
    emotion: "Ansiedad por proyecto",
    intensity: 8,
    theme: "Trabajo",
    trend: "down" as const,
    description: "Preocupación intensa por la presentación del proyecto. Miedo al juicio de los colegas.",
  },
  {
    date: "12 Ene 2024",
    emotion: "Culpa familiar",
    intensity: 6,
    theme: "Familia",
    trend: "stable" as const,
    description: "Conflicto interno sobre decisiones personales vs. expectativas familiares.",
  },
  {
    date: "08 Ene 2024",
    emotion: "Miedo al cambio",
    intensity: 7,
    theme: "Crecimiento personal",
    trend: "up" as const,
    description: "Resistencia a salir de la zona de confort, pero con pequeños avances.",
  },
  {
    date: "05 Ene 2024",
    emotion: "Esperanza renovada",
    intensity: 4,
    theme: "Autoconocimiento",
    trend: "up" as const,
    description: "Momento de claridad después de una sesión de reflexión profunda.",
  },
]

export default function PatronesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">Espejo Cognitivo</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Un reflejo profundo de tus patrones mentales y evolución emocional
          </p>
        </div>

        {/* Mirror Box - AI Observation */}
        <div className="mb-12">
          <MirrorBox
            observation="Te observo repetir la frase 'no soy suficiente' en diferentes contextos. Esta creencia aparece especialmente cuando te enfrentas a nuevos desafíos o cuando comparas tus logros con otros."
            pattern="Tu mente tiende a magnificar los riesgos y minimizar tus capacidades. Es un mecanismo de protección, pero que te limita."
            suggestion="¿Qué pasaría si en lugar de preguntarte 'soy suficiente?' te preguntaras '¿qué puedo aprender de esto?'"
          />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">23</div>
              <div className="text-sm text-slate-600">Sesiones analizadas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">8</div>
              <div className="text-sm text-slate-600">Patrones detectados</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">5</div>
              <div className="text-sm text-slate-600">Emociones principales</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">67%</div>
              <div className="text-sm text-slate-600">Progreso emocional</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Patterns */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span>Patrones Dominantes</span>
              </h2>
              <div className="space-y-6">
                {patterns.map((pattern, index) => (
                  <PatternCard key={index} {...pattern} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Emotions */}
          <div className="space-y-8">
            <EmotionGraph emotions={emotionData} />
          </div>
        </div>

        {/* Quotes Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span>Frases que Repites</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <QuoteBubble key={index} {...quote} />
            ))}
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="mb-12">
          <SessionEvolution sessions={evolutionData} />
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Profundiza tu autoconocimiento</h3>
              <p className="text-purple-100 mb-6">Explora tus creencias limitantes con el módulo Antídoto</p>
              <Link href="/app/antidoto">
                <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl font-semibold">
                  Explorar creencias
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Continúa reflexionando</h3>
              <p className="text-slate-600 mb-6">Escribe un nuevo dilema para seguir conociendo tu mente</p>
              <Link href="/dilemas">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl font-semibold text-white">
                  Nuevo dilema
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
