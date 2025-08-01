"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface EmotionData {
  emotion: string
  percentage: number
  count: number
  color: string
  emoji: string
}

interface EmotionGraphProps {
  emotions: EmotionData[]
  title?: string
}

export function EmotionGraph({ emotions, title = "Emociones Más Frecuentes" }: EmotionGraphProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
          <span className="text-2xl">🎭</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {emotions.map((emotion, index) => (
          <div key={emotion.emotion} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{emotion.emoji}</span>
                <div>
                  <span className="font-medium text-slate-800">{emotion.emotion}</span>
                  <div className="text-sm text-slate-500">{emotion.count} veces</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-slate-800">{emotion.percentage}%</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={emotion.percentage} className="h-3 bg-slate-100" />
              <div
                className="absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${emotion.percentage}%`,
                  background: `linear-gradient(90deg, ${emotion.color}, ${emotion.color}dd)`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
