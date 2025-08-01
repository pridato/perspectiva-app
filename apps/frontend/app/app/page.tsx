"use client"

import { AppNavigation } from "@/components/app-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit3, History, Sparkles, Eye } from "lucide-react"
import Link from "next/link"

export default function AppDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido de vuelta</h1>
          <p className="text-slate-600">¿Qué tienes en mente hoy?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">Nuevo Dilema</h3>
                  <p className="text-sm text-slate-600">Escribe lo que tienes en mente</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl">
                Empezar
              </Button>
            </CardContent>
          </Card>

          <Link href="/app/historial">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Mi Historial</h3>
                    <p className="text-sm text-slate-600">12 dilemas escritos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/app/patrones">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-3xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Espejo Cognitivo</h3>
                    <p className="text-sm text-slate-600">Descubre tus patrones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Autoconocimiento Module Unlock */}
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">¡Módulo de Autoconocimiento Desbloqueado!</h3>
                <p className="text-purple-100 mb-4">
                  Has escrito 12 dilemas. Ahora puedes explorar tus patrones emocionales y creencias.
                </p>
                <Link href="/app/patrones">
                  <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-xl font-semibold">
                    Explorar mis patrones
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-slate-800 font-medium">Dilema sobre decisión laboral</p>
                <p className="text-sm text-slate-600">Hace 2 días</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                Ver respuestas
              </Button>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-slate-800 font-medium">Reflexión sobre relaciones familiares</p>
                <p className="text-sm text-slate-600">Hace 5 días</p>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                Ver respuestas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
