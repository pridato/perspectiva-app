"use client"

import { AppNavigation } from "@/components/app-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data
const emocionesFrequentes = [
  { emocion: "Ansiedad", porcentaje: 35, color: "bg-red-500", count: 8 },
  { emocion: "Culpa", porcentaje: 25, color: "bg-orange-500", count: 6 },
  { emocion: "Miedo", porcentaje: 20, color: "bg-yellow-500", count: 5 },
  { emocion: "Tristeza", porcentaje: 15, color: "bg-blue-500", count: 3 },
  { emocion: "Envidia", porcentaje: 5, color: "bg-purple-500", count: 1 },
]

const creenciasLimitantes = [
  {
    id: 1,
    creencia: "No soy suficiente",
    frecuencia: 7,
    ejemplos: ["Miedo al fracaso en mi proyecto", "Comparación constante con otros"],
    intensidad: "alta",
  },
  {
    id: 2,
    creencia: "Necesito aprobación de otros",
    frecuencia: 5,
    ejemplos: ["Presión familiar por tener hijos", "Conflicto con mi pareja"],
    intensidad: "media",
  },
  {
    id: 3,
    creencia: "No puedo cambiar mi situación",
    frecuencia: 4,
    ejemplos: ["¿Debería cambiar de trabajo?", "Conflicto con mi pareja"],
    intensidad: "media",
  },
]

const contradicciones = [
  {
    id: 1,
    titulo: "Quieres independencia pero buscas aprobación",
    dilemas: ["Presión familiar por tener hijos", "¿Debería cambiar de trabajo?"],
    descripcion:
      "En algunos dilemas buscas libertad para decidir, pero en otros necesitas que otros aprueben tus decisiones.",
  },
  {
    id: 2,
    titulo: "Te comparas pero valoras la autenticidad",
    dilemas: ["Comparación constante con otros", "Miedo al fracaso en mi proyecto"],
    descripcion: "Valoras ser auténtico en tus proyectos, pero te comparas constantemente con otros en redes sociales.",
  },
]

export default function PatronesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mis Patrones</h1>
          <p className="text-slate-600">Descubre las tendencias en tus pensamientos y emociones</p>
        </div>

        {/* Emociones Frecuentes */}
        <Card className="border-0 shadow-lg rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Emociones Más Frecuentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emocionesFrequentes.map((item) => (
              <div key={item.emocion} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{item.emocion}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">{item.count} veces</span>
                    <span className="text-sm font-semibold text-slate-800">{item.porcentaje}%</span>
                  </div>
                </div>
                <Progress value={item.porcentaje} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Creencias Limitantes */}
        <Card className="border-0 shadow-lg rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Creencias Limitantes Detectadas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {creenciasLimitantes.map((creencia) => (
              <div key={creencia.id} className="p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-800">"{creencia.creencia}"</h3>
                  <Badge
                    className={`${
                      creencia.intensidad === "alta" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    } border-0 rounded-full`}
                  >
                    {creencia.intensidad === "alta" ? "Alta intensidad" : "Media intensidad"}
                  </Badge>
                </div>
                <p className="text-slate-600 mb-3">Aparece en {creencia.frecuencia} de tus dilemas</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-slate-700">Ejemplos:</p>
                  {creencia.ejemplos.map((ejemplo, index) => (
                    <div key={index} className="text-sm text-slate-600 pl-4 border-l-2 border-purple-200">
                      {ejemplo}
                    </div>
                  ))}
                </div>
                <Link href={`/app/antidoto?creencia=${encodeURIComponent(creencia.creencia)}`}>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Explorar esta creencia
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contradicciones */}
        <Card className="border-0 shadow-lg rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5 text-indigo-600" />
              <span>Contradicciones en tus Dilemas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {contradicciones.map((contradiccion) => (
              <div key={contradiccion.id} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{contradiccion.titulo}</h3>
                <p className="text-slate-600 mb-4">{contradiccion.descripcion}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Dilemas relacionados:</p>
                  {contradiccion.dilemas.map((dilema, index) => (
                    <div key={index} className="text-sm text-slate-600 pl-4 border-l-2 border-indigo-300">
                      {dilema}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reflexión Personal */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Momento de Reflexión</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Estos patrones no te definen, pero sí te muestran áreas donde puedes crecer. ¿Hay alguna creencia que te
              gustaría explorar más profundamente?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/antidoto">
                <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl font-semibold">
                  Explorar creencias
                </Button>
              </Link>
              <Link href="/app">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-xl bg-transparent"
                >
                  Escribir nuevo dilema
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
