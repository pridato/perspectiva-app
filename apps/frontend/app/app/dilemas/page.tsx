"use client"

import { useState } from "react"
import { AppNavigation } from "@/components/app-navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit3, History, Brain, Loader2 } from "lucide-react"
import Link from "next/link"

export default function DilemasPage() {
  const [contenido, setContenido] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Maneja el envío del dilema
   * @returns void
   */
  const handleSubmit = async () => {
    if (!contenido.trim()) {
      alert('Por favor escribe tu dilema')
      return
    }

    if (contenido.length < 10) {
      alert('El dilema debe tener al menos 10 caracteres')
      return
    }

    setIsLoading(true)

    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        alert('No estás autenticado. Por favor inicia sesión.')
        return
      }

      // Crear el dilema
      const response = await fetch('http://localhost:3001/dilemas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: contenido.substring(0, 50) + '...', // Título automático
          contenido: contenido.trim()
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('¡Dilema creado exitosamente!')
        setContenido('') // Limpiar formulario
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear el dilema. Revisa la consola.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <AppNavigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">¿Qué tienes en mente?</h1>
            <p className="text-xl text-slate-600">Escribe tu dilema y recibe tres perspectivas únicas</p>
          </div>

          {/* Main Writing Area */}
          <Card className="border-0 shadow-2xl rounded-3xl mb-8 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Describe lo que tienes en mente... No hay límites ni juicios aquí."
                  className="w-full h-64 p-6 border-0 bg-slate-50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-700 placeholder-slate-400 text-lg leading-relaxed"
                  maxLength={5000}
                />
                <div className="text-xs text-slate-400">
                  {contenido.length}/5000 caracteres
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-500">Tus pensamientos están seguros aquí</div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading || !contenido.trim()}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-5 h-5 mr-2" />
                        Obtener perspectivas
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/app/historial">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center">
                      <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Ver mi historial</h3>
                      <p className="text-sm text-slate-600">23 dilemas escritos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/app/patrones">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Espejo Cognitivo</h3>
                      <p className="text-sm text-slate-600">Descubre tus patrones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}