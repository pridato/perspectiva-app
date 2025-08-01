"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, TrendingUp, TrendingDown, Eye } from "lucide-react"

// Datos comparativos
const comparisonData = {
  past: {
    period: "Hace 6 meses",
    dominantEmotions: [
      { emotion: "Ansiedad", percentage: 45, color: "bg-red-500" },
      { emotion: "Culpa", percentage: 30, color: "bg-orange-500" },
      { emotion: "Miedo", percentage: 25, color: "bg-yellow-500" },
    ],
    limitingBeliefs: [
      "No soy suficiente",
      "Necesito aprobación de otros",
      "No puedo cambiar mi situación",
      "Los errores me definen",
    ],
    frequentDilemmas: ["¿Qué pensarán de mí?", "No puedo tomar esta decisión", "Siempre arruino todo"],
    patterns: ["Evitación de conflictos", "Perfeccionismo paralizante", "Rumiación excesiva"],
  },
  present: {
    period: "Actualidad",
    dominantEmotions: [
      { emotion: "Esperanza", percentage: 40, color: "bg-green-500" },
      { emotion: "Curiosidad", percentage: 35, color: "bg-blue-500" },
      { emotion: "Calma", percentage: 25, color: "bg-purple-500" },
    ],
    dismantledBeliefs: [
      "Mis errores son oportunidades de aprendizaje",
      "Mi valor no depende de la opinión de otros",
      "Tengo el poder de cambiar mi perspectiva",
      "Soy suficiente tal como soy",
    ],
    newPatterns: ["Comunicación asertiva", "Aceptación de la imperfección", "Mindfulness y presencia"],
    progress: [
      { area: "Autoestima", value: 75 },
      { area: "Relaciones", value: 68 },
      { area: "Toma de decisiones", value: 82 },
      { area: "Gestión emocional", value: 71 },
    ],
  },
  analysis:
    "Antes tendías al autosabotaje y la búsqueda constante de validación externa. Ahora predominan creencias de validación interna y una mayor capacidad de autorregulación emocional. Tu evolución muestra un cambio significativo hacia la autonomía emocional.",
}

export function PastVsPresent() {
  const [showTimeline, setShowTimeline] = useState(false)

  return (
    <div className="space-y-6">
      {/* Análisis principal */}
      <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tu Evolución Emocional</h2>
              <p className="text-indigo-100">Un viaje de transformación personal</p>
            </div>
          </div>
          <p className="text-indigo-100 leading-relaxed">{comparisonData.analysis}</p>
        </CardContent>
      </Card>

      {/* Comparativa lado a lado */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pasado */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-700 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{comparisonData.past.period}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Emociones dominantes pasadas */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Emociones Dominantes</h3>
              <div className="space-y-3">
                {comparisonData.past.dominantEmotions.map((emotion, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">{emotion.emotion}</span>
                      <span className="text-sm text-slate-500">{emotion.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-300 rounded-full h-2">
                      <div
                        className={`${emotion.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${emotion.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creencias limitantes */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Creencias Limitantes</h3>
              <div className="space-y-2">
                {comparisonData.past.limitingBeliefs.map((belief, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">"{belief}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dilemas frecuentes */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Dilemas Frecuentes</h3>
              <div className="space-y-2">
                {comparisonData.past.frequentDilemmas.map((dilemma, index) => (
                  <div key={index} className="bg-slate-200 rounded-xl p-3">
                    <p className="text-sm text-slate-600 italic">"{dilemma}"</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Presente */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-700 flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span>{comparisonData.present.period}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Emociones actuales */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Emociones Predominantes</h3>
              <div className="space-y-3">
                {comparisonData.present.dominantEmotions.map((emotion, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">{emotion.emotion}</span>
                      <span className="text-sm text-slate-500">{emotion.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`${emotion.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${emotion.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creencias transformadas */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Creencias Transformadas</h3>
              <div className="space-y-2">
                {comparisonData.present.dismantledBeliefs.map((belief, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">"{belief}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progreso por áreas */}
            <div>
              <h3 className="font-semibold text-slate-700 mb-3">Progreso por Áreas</h3>
              <div className="space-y-3">
                {comparisonData.present.progress.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">{area.area}</span>
                      <span className="text-sm text-slate-500">{area.value}%</span>
                    </div>
                    <Progress value={area.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para timeline */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">¿Quieres ver tu evolución completa?</h3>
          <p className="text-slate-600 mb-4">Explora los hitos más importantes de tu crecimiento personal</p>
          <Button
            onClick={() => setShowTimeline(!showTimeline)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showTimeline ? "Ocultar" : "Ver"} evolución cronológica
          </Button>

          {/* Timeline simple */}
          {showTimeline && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">Inicio del viaje</p>
                    <p className="text-sm text-slate-600">Primer dilema: "¿Por qué siempre me siento insuficiente?"</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">Primer insight</p>
                    <p className="text-sm text-slate-600">Descubrimiento del patrón de perfeccionismo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">Punto de inflexión</p>
                    <p className="text-sm text-slate-600">Momento de aceptación: "Soy suficiente tal como soy"</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-left">
                    <p className="font-medium text-slate-800">Estado actual</p>
                    <p className="text-sm text-slate-600">Integración de nuevos patrones de pensamiento</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
