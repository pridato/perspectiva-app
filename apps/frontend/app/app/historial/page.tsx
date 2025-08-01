"use client"

import { AppNavigation } from "@/components/app-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Eye, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data
const dilemas = [
  {
    id: 1,
    titulo: "¿Debería cambiar de trabajo?",
    fecha: "2024-01-15",
    emocion: "ansiedad",
    tags: ["trabajo", "decisiones", "futuro"],
    preview: "Llevo 3 años en mi trabajo actual y siento que no crezco profesionalmente...",
    iconoEmocion: "😰",
  },
  {
    id: 2,
    titulo: "Conflicto con mi pareja",
    fecha: "2024-01-12",
    emocion: "tristeza",
    tags: ["relaciones", "comunicación", "amor"],
    preview: "Últimamente discutimos mucho y no sé si es normal o si algo está mal...",
    iconoEmocion: "😢",
  },
  {
    id: 3,
    titulo: "Presión familiar por tener hijos",
    fecha: "2024-01-10",
    emocion: "culpa",
    tags: ["familia", "presión social", "decisiones"],
    preview: "Mi familia constantemente me pregunta cuándo voy a tener hijos...",
    iconoEmocion: "😔",
  },
  {
    id: 4,
    titulo: "Miedo al fracaso en mi proyecto",
    fecha: "2024-01-08",
    emocion: "miedo",
    tags: ["trabajo", "autoestima", "proyectos"],
    preview: "Estoy por lanzar mi propio negocio pero tengo terror de que fracase...",
    iconoEmocion: "😨",
  },
  {
    id: 5,
    titulo: "Comparación constante con otros",
    fecha: "2024-01-05",
    emocion: "envidia",
    tags: ["autoestima", "redes sociales", "comparación"],
    preview: "No puedo evitar compararme con mis amigos en redes sociales...",
    iconoEmocion: "😒",
  },
]

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    trabajo: "bg-blue-100 text-blue-700",
    relaciones: "bg-pink-100 text-pink-700",
    familia: "bg-green-100 text-green-700",
    autoestima: "bg-purple-100 text-purple-700",
    decisiones: "bg-amber-100 text-amber-700",
    comunicación: "bg-indigo-100 text-indigo-700",
    futuro: "bg-cyan-100 text-cyan-700",
    amor: "bg-rose-100 text-rose-700",
    "presión social": "bg-orange-100 text-orange-700",
    proyectos: "bg-teal-100 text-teal-700",
    "redes sociales": "bg-violet-100 text-violet-700",
    comparación: "bg-slate-100 text-slate-700",
  }
  return colors[tag] || "bg-gray-100 text-gray-700"
}

export default function HistorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Mi Historial</h1>
          <p className="text-slate-600">Un recorrido por tus reflexiones y crecimiento personal</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-slate-600">Dilemas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">36</div>
              <div className="text-sm text-slate-600">Respuestas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">8</div>
              <div className="text-sm text-slate-600">Temas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-sm text-slate-600">Días activo</div>
            </CardContent>
          </Card>
        </div>

        {/* Dilemas List */}
        <div className="space-y-6">
          {dilemas.map((dilema) => (
            <Card
              key={dilema.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Emotion Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-2xl">
                    {dilema.iconoEmocion}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-slate-800">{dilema.titulo}</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(dilema.fecha).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{dilema.preview}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {dilema.tags.map((tag) => (
                        <Badge key={tag} className={`${getTagColor(tag)} border-0 rounded-full px-3 py-1`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver respuestas
                      </Button>
                      <Link href="/app/patrones">
                        <Button variant="ghost" size="sm" className="rounded-xl text-slate-600 hover:text-slate-800">
                          <Brain className="w-4 h-4 mr-2" />
                          Ver evolución
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to Patterns */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">¿Ves algún patrón?</h3>
            <p className="text-purple-100 mb-4">
              Analiza tus emociones recurrentes y descubre creencias que podrían estar limitándote
            </p>
            <Link href="/app/patrones">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl font-semibold">
                Analizar mis patrones
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
