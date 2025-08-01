"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Eye } from "lucide-react"

interface MirrorBoxProps {
  observation: string
  pattern: string
  suggestion?: string
}

export function MirrorBox({ observation, pattern, suggestion }: MirrorBoxProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-2xl"></div>
          </div>

          <div className="relative p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tu Espejo Cognitivo</h3>
                <p className="text-slate-300 text-sm">Lo que observo en ti</p>
              </div>
            </div>

            {/* Observation */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Observación</span>
              </div>
              <p className="text-white leading-relaxed pl-6 border-l-2 border-purple-500">{observation}</p>
            </div>

            {/* Pattern */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-300">Patrón detectado</span>
              </div>
              <p className="text-slate-200 leading-relaxed pl-6 border-l-2 border-indigo-500">{pattern}</p>
            </div>

            {/* Suggestion */}
            {suggestion && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300">Reflexión</span>
                </div>
                <p className="text-slate-200 leading-relaxed pl-6 border-l-2 border-amber-500">{suggestion}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
