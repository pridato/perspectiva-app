"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Zap, Brain, Calendar, Target } from "lucide-react"
import { cn } from "@/lib/utils"

// Tipos para la estructura del árbol emocional
interface EmotionalNode {
  id: string
  emotion: string
  intensity: number
  belief: string
  event: string
  pattern: string
  currentImpact: string
  color: string
  children?: EmotionalNode[]
}

// Datos mock del árbol emocional
const emotionalTreeData: EmotionalNode[] = [
  {
    id: "1",
    emotion: "Rabia",
    intensity: 8,
    belief: "Las cosas deberían ser justas",
    event: "Promoción negada en el trabajo",
    pattern: "Rumiación sobre injusticias",
    currentImpact: "Tensión en relaciones laborales",
    color: "from-red-500 to-orange-500",
    children: [
      {
        id: "1.1",
        emotion: "Frustración",
        intensity: 6,
        belief: "No tengo control sobre mi vida",
        event: "Decisiones tomadas por otros",
        pattern: "Evitación de responsabilidades",
        currentImpact: "Procrastinación en proyectos personales",
        color: "from-orange-500 to-yellow-500",
      },
      {
        id: "1.2",
        emotion: "Resentimiento",
        intensity: 7,
        belief: "Los demás no me valoran",
        event: "Falta de reconocimiento",
        pattern: "Comparación constante con otros",
        currentImpact: "Dificultad para celebrar logros propios",
        color: "from-red-600 to-pink-500",
      },
    ],
  },
  {
    id: "2",
    emotion: "Vacío",
    intensity: 9,
    belief: "No soy suficiente",
    event: "Críticas constantes en la infancia",
    pattern: "Búsqueda de validación externa",
    currentImpact: "Dependencia emocional en relaciones",
    color: "from-slate-500 to-gray-600",
    children: [
      {
        id: "2.1",
        emotion: "Soledad",
        intensity: 8,
        belief: "Nadie me comprende realmente",
        event: "Aislamiento social en adolescencia",
        pattern: "Evitación de intimidad emocional",
        currentImpact: "Dificultad para formar vínculos profundos",
        color: "from-blue-600 to-indigo-600",
      },
    ],
  },
  {
    id: "3",
    emotion: "Ansiedad",
    intensity: 7,
    belief: "Algo malo va a pasar",
    event: "Experiencias de pérdida temprana",
    pattern: "Hipervigilancia y control excesivo",
    currentImpact: "Dificultad para relajarse y disfrutar",
    color: "from-yellow-500 to-amber-500",
    children: [
      {
        id: "3.1",
        emotion: "Miedo al fracaso",
        intensity: 8,
        belief: "Si fallo, soy un fracaso",
        event: "Expectativas altas familiares",
        pattern: "Perfeccionismo paralizante",
        currentImpact: "Evitación de nuevos desafíos",
        color: "from-purple-500 to-violet-500",
      },
    ],
  },
]

interface EmotionalNodeProps {
  node: EmotionalNode
  level: number
}

function EmotionalNodeComponent({ node, level }: EmotionalNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="relative">
      {/* Línea conectora */}
      {level > 0 && (
        <div className="absolute -left-6 top-6 w-6 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
      )}

      {/* Nodo principal */}
      <div
        className={cn(
          "relative mb-4 transition-all duration-300",
          level > 0 && "ml-8",
          showDetails && "transform scale-105",
        )}
      >
        <Card
          className={cn(
            "border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer overflow-hidden",
            showDetails && "ring-2 ring-purple-300",
          )}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={`h-1 bg-gradient-to-r ${node.color}`}></div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${node.color} animate-pulse`}></div>
                <div>
                  <h3 className="font-semibold text-slate-800">{node.emotion}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Intensidad: {node.intensity}/10
                    </Badge>
                  </div>
                </div>
              </div>

              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                  }}
                  className="rounded-full"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              )}
            </div>

            {/* Detalles expandidos */}
            {showDetails && (
              <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-slate-700">Creencia</span>
                    </div>
                    <p className="text-sm text-slate-600 pl-6 border-l-2 border-purple-200">"{node.belief}"</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-slate-700">Evento origen</span>
                    </div>
                    <p className="text-sm text-slate-600 pl-6 border-l-2 border-indigo-200">{node.event}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-slate-700">Patrón mental</span>
                    </div>
                    <p className="text-sm text-slate-600 pl-6 border-l-2 border-amber-200">{node.pattern}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-700">Impacto actual</span>
                    </div>
                    <p className="text-sm text-slate-600 pl-6 border-l-2 border-green-200">{node.currentImpact}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nodos hijos */}
        {hasChildren && isExpanded && (
          <div className="mt-4 relative">
            {/* Línea vertical conectora */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-transparent"></div>
            {node.children?.map((child) => (
              <EmotionalNodeComponent key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function EmotionalTree() {
  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-lg">🌳</span>
          </div>
          <span>Árbol Emocional</span>
        </CardTitle>
        <p className="text-slate-600">
          Explora las raíces de tus emociones y cómo se conectan con tus creencias y patrones mentales
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4">
          <p className="text-sm text-slate-700">
            💡 <strong>Tip:</strong> Haz clic en cada emoción para ver sus detalles. Usa las flechas para expandir las
            conexiones.
          </p>
        </div>

        <div className="space-y-6">
          {emotionalTreeData.map((node) => (
            <EmotionalNodeComponent key={node.id} node={node} level={0} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
