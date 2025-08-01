"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, Heart, Brain } from "lucide-react"

interface PatternCardProps {
  title: string
  description: string
  intensity: "low" | "medium" | "high"
  type: "cognitive" | "emotional" | "behavioral"
  frequency: number
  examples?: string[]
}

const getPatternIcon = (type: string) => {
  switch (type) {
    case "cognitive":
      return Brain
    case "emotional":
      return Heart
    case "behavioral":
      return TrendingUp
    default:
      return AlertTriangle
  }
}

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200"
    case "medium":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "low":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "cognitive":
      return "from-blue-500 to-indigo-600"
    case "emotional":
      return "from-pink-500 to-rose-600"
    case "behavioral":
      return "from-purple-500 to-violet-600"
    default:
      return "from-gray-500 to-slate-600"
  }
}

export function PatternCard({ title, description, intensity, type, frequency, examples }: PatternCardProps) {
  const Icon = getPatternIcon(type)

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(type)} rounded-2xl flex items-center justify-center flex-shrink-0`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-800 leading-tight">{title}</h3>
              <Badge className={`${getIntensityColor(intensity)} border rounded-full px-3 py-1 text-xs font-medium`}>
                {intensity === "high" ? "Alta" : intensity === "medium" ? "Media" : "Baja"} intensidad
              </Badge>
            </div>

            <p className="text-slate-600 leading-relaxed">{description}</p>

            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>Frecuencia: {frequency} veces</span>
              <span>•</span>
              <span className="capitalize">
                {type === "cognitive" ? "Cognitivo" : type === "emotional" ? "Emocional" : "Conductual"}
              </span>
            </div>

            {examples && examples.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Ejemplos:</p>
                <div className="space-y-1">
                  {examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="text-sm text-slate-600 pl-4 border-l-2 border-purple-200 italic">
                      "{example}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
