"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppNavigation } from "@/components/app-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, Clock, BookOpen, ArrowLeft, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function AntidotoPage() {
  const searchParams = useSearchParams()
  const creencia = searchParams.get("creencia") || "No soy suficiente"
  const [activeTab, setActiveTab] = useState("logico")

  const analisis = {
    logico: {
      titulo: "Análisis Lógico",
      icon: Brain,
      color: "from-blue-500 to-indigo-600",
      contenido: {
        preguntasClave: [
          "¿Qué evidencia real tienes de que no eres suficiente?",
          "¿En qué áreas de tu vida SÍ has demostrado ser suficiente?",
          "¿Qué estándar estás usando para medirte?",
        ],
        reflexion:
          "Esta creencia suele basarse en comparaciones injustas o estándares imposibles. La suficiencia no es una medida absoluta, sino relativa al contexto y tus propios valores.",
        ejercicio:
          "Haz una lista de 10 logros personales, por pequeños que sean. Incluye desde aprender a caminar hasta cualquier habilidad que hayas desarrollado.",
      },
    },
    emocional: {
      titulo: "Perspectiva Emocional",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      contenido: {
        preguntasClave: [
          "¿Cuándo comenzaste a sentir que no eras suficiente?",
          "¿Qué emociones surgen cuando piensas en esta creencia?",
          "¿Cómo te hablarías a un amigo que sintiera lo mismo?",
        ],
        reflexion:
          "Esta creencia a menudo nace de heridas emocionales tempranas. Reconocer su origen te ayuda a tratarla con compasión en lugar de juicio.",
        ejercicio:
          "Escribe una carta de compasión hacia ti mismo, como si fueras tu mejor amigo consolándote en un momento difícil.",
      },
    },
    historico: {
      titulo: "Contexto Histórico",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      contenido: {
        preguntasClave: [
          "¿Qué eventos específicos reforzaron esta creencia?",
          "¿Qué voces del pasado escuchas cuando piensas esto?",
          "¿Cómo ha evolucionado esta creencia a lo largo del tiempo?",
        ],
        reflexion:
          "Las creencias limitantes suelen formarse en contextos específicos que ya no son relevantes. Lo que fue cierto en el pasado no define tu presente.",
        ejercicio:
          "Crea una línea de tiempo de momentos donde esta creencia se fortaleció, y luego identifica evidencia contraria para cada período.",
      },
    },
    filosofico: {
      titulo: "Reflexión Filosófica",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-600",
      contenido: {
        preguntasClave: [
          "¿Qué significa realmente 'ser suficiente'?",
          "¿Es posible que la imperfección sea parte de la condición humana?",
          "¿Cómo cambiaría tu vida si aceptaras tu humanidad completa?",
        ],
        reflexion:
          "La filosofía nos enseña que la búsqueda de la perfección puede ser una trampa. La suficiencia no es un destino, sino un estado de aceptación del presente.",
        ejercicio:
          "Reflexiona: Si fueras la última persona en la Tierra, ¿seguirías sintiéndote insuficiente? ¿Qué te dice esto sobre el origen de esta creencia?",
      },
    },
  }

  const currentAnalisis = analisis[activeTab as keyof typeof analisis]
  const Icon = currentAnalisis.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/app/patrones">
            <Button variant="ghost" className="mb-4 text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al espejo cognitivo
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Módulo Antídoto</h1>
          <p className="text-slate-600">
            Explorando la creencia: <span className="font-semibold">"{creencia}"</span>
          </p>
        </div>

        {/* Intro Card */}
        <Card className="border-0 shadow-lg rounded-2xl mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Desafiando tu creencia</h2>
                <p className="text-purple-100">Vamos a explorar esta creencia desde cuatro perspectivas diferentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Tabs */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-100 m-4 rounded-2xl">
                <TabsTrigger value="logico" className="rounded-xl">
                  Lógico
                </TabsTrigger>
                <TabsTrigger value="emocional" className="rounded-xl">
                  Emocional
                </TabsTrigger>
                <TabsTrigger value="historico" className="rounded-xl">
                  Histórico
                </TabsTrigger>
                <TabsTrigger value="filosofico" className="rounded-xl">
                  Filosófico
                </TabsTrigger>
              </TabsList>

              {Object.entries(analisis).map(([key, data]) => (
                <TabsContent key={key} value={key} className="p-6">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${data.color} rounded-2xl flex items-center justify-center`}
                      >
                        <data.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{data.titulo}</h3>
                    </div>

                    {/* Preguntas Clave */}
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-800 mb-4">Preguntas para reflexionar:</h4>
                      <ul className="space-y-3">
                        {data.contenido.preguntasClave.map((pregunta, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-700">{pregunta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reflexión */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Reflexión:</h4>
                      <p className="text-slate-700 leading-relaxed">{data.contenido.reflexion}</p>
                    </div>

                    {/* Ejercicio */}
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Ejercicio práctico:</h4>
                      <p className="text-slate-700 leading-relaxed">{data.contenido.ejercicio}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">¿Te ayudó esta exploración?</h3>
              <p className="text-slate-600 mb-4">Escribe un nuevo dilema con esta nueva perspectiva</p>
              <Link href="/app">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                  Escribir nuevo dilema
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Explora otra creencia</h3>
              <p className="text-slate-600 mb-4">Continúa tu proceso de autoconocimiento</p>
              <Link href="/app/patrones">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl bg-transparent"
                >
                  Ver mis patrones
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
