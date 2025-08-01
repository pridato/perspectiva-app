"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface SessionPoint {
  date: string
  emotion: string
  intensity: number
  theme: string
  trend: "up" | "down" | "stable"
  description: string
}

interface SessionEvolutionProps {
  sessions: SessionPoint[]
  title?: string
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return TrendingUp
    case "down":
      return TrendingDown
    default:
      return Minus
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-green-600 bg-green-100"
    case "down":
      return "text-red-600 bg-red-100"
    default:
      return "text-slate-600 bg-slate-100"
  }
}

const getIntensityColor = (intensity: number) => {
  if (intensity >= 8) return "bg-red-500"
  if (intensity >= 6) return "bg-amber-500"
  if (intensity >= 4) return "bg-yellow-500"
  return "bg-green-500"
}

export function SessionEvolution({ sessions, title = "Evolución Emocional" }: SessionEvolutionProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-purple-200"></div>

          <div className="space-y-8">
            {sessions.map((session, index) => {
              const TrendIcon = getTrendIcon(session.trend)

              return (
                <div key={index} className="relative flex items-start space-x-6">
                  {/* Timeline Point */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-4 h-4 ${getIntensityColor(session.intensity)} rounded-full border-4 border-white shadow-lg`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3 pb-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-800">{session.emotion}</h4>
                        <p className="text-sm text-slate-500">{session.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getTrendColor(session.trend)} border-0 rounded-full px-2 py-1`}>
                          <TrendIcon className="w-3 h-3 mr-1" />
                          {session.trend === "up" ? "Mejora" : session.trend === "down" ? "Declive" : "Estable"}
                        </Badge>
                        <div className="text-xs text-slate-500">Intensidad: {session.intensity}/10</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50">
                        {session.theme}
                      </Badge>
                      <p className="text-slate-600 leading-relaxed">{session.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
