"use client"

import { useState } from "react"
import { AppNavigation } from "@/components/app-navigation"
import { EmotionalTree } from "@/components/profile/emotional-tree"
import { PastVsPresent } from "@/components/profile/past-vs-present"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, TreePine, GitCompare, Calendar, Download, Share2 } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header del perfil */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Mi Perfil Emocional</h1>
              <p className="text-slate-600">Un mapa completo de tu crecimiento personal</p>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">23</div>
                <div className="text-sm text-slate-600">Dilemas procesados</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">8</div>
                <div className="text-sm text-slate-600">Patrones identificados</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-slate-600">Creencias transformadas</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">127</div>
                <div className="text-sm text-slate-600">Días de crecimiento</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navegación por tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-1 mb-8">
            <TabsTrigger value="overview" className="rounded-xl flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="tree" className="rounded-xl flex items-center space-x-2">
              <TreePine className="w-4 h-4" />
              <span>Árbol Emocional</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="rounded-xl flex items-center space-x-2">
              <GitCompare className="w-4 h-4" />
              <span>Mi Evolución</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido del resumen */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Resumen emocional */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Estado Emocional Actual</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Bienestar general</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full">
                          <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Autoconocimiento</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full">
                          <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">90%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Gestión emocional</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-slate-200 rounded-full">
                          <div className="w-14 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">70%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logros recientes */}
              <Card className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Logros Recientes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Identificaste el patrón de perfeccionismo</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-700">Transformaste la creencia "No soy suficiente"</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700">Desarrollaste mayor autocompasión</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-700">Mejoraste tu comunicación asertiva</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acciones rápidas */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <Download className="w-5 h-5 mr-2" />
                Exportar progreso
              </Button>
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartir insights
              </Button>
              <Button
                variant="outline"
                className="h-16 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Programar reflexión
              </Button>
            </div>
          </TabsContent>

          {/* Contenido del árbol emocional */}
          <TabsContent value="tree">
            <EmotionalTree />
          </TabsContent>

          {/* Contenido de la comparativa */}
          <TabsContent value="comparison">
            <PastVsPresent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
