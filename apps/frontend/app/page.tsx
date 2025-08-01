import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Edit3, Users, Lightbulb, Heart, Brain, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Perspectiva</span>
          </div>
          <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
            Iniciar sesión
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
                Haz una pregunta a tu{" "}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  mente
                </span>
                . Recibe tres respuestas.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Escribe un pensamiento o dilema. Obtén 3 perspectivas diferentes al instante.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Probar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-200 hover:border-purple-300 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 bg-transparent"
              >
                Ver ejemplo
              </Button>
            </div>
            <p className="text-sm text-slate-500">Sin registro. En 1 minuto puedes sentirte mejor.</p>
          </div>
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Tres mentores virtuales"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Cómo funciona</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Tres pasos simples para obtener claridad mental</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto">
              <Edit3 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-800">1. Escribe tu dilema</h3>
              <p className="text-slate-600">Comparte lo que tienes en mente. No hay límites ni juicios.</p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-800">2. Conoce a tus mentores</h3>
              <p className="text-slate-600">Tres perspectivas únicas: empática, profunda y brutalmente honesta.</p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto">
              <Lightbulb className="w-8 h-8 text-amber-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-800">3. Descubre claridad</h3>
              <p className="text-slate-600">Encuentra contradicción, nuevos caminos o simplemente paz mental.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Presentación de mentores */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-white/50 rounded-3xl mx-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Tus tres mentores</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Cada uno te ayudará de una manera diferente</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800">El Psicólogo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tono cálido y empático. Te ayuda a entender tus emociones y encontrar patrones en tu comportamiento.
                </p>
              </div>
              <div className="bg-white/70 rounded-2xl p-4">
                <p className="text-sm text-slate-700 italic">
                  "Es normal sentirse así. Exploremos qué hay detrás de estos pensamientos..."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800">El Filósofo</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tono profundo y abstracto. Te invita a reflexionar sobre el significado más amplio de tu situación.
                </p>
              </div>
              <div className="bg-white/70 rounded-2xl p-4">
                <p className="text-sm text-slate-700 italic">
                  "¿Qué nos dice esto sobre la condición humana? Consideremos las implicaciones más profundas..."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800">El Amigo Honesto</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tono directo e informal. Te dice las verdades que necesitas escuchar, sin filtros.
                </p>
              </div>
              <div className="bg-white/70 rounded-2xl p-4">
                <p className="text-sm text-slate-700 italic">
                  "Mira, seamos realistas aquí. Esto es lo que realmente está pasando..."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sección emocional */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
            No necesitas más consejos.{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Necesitas perspectiva.
            </span>
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Todos tenemos esos momentos donde damos vueltas en círculo, atrapados en nuestros propios pensamientos.
            Perspectiva te ayuda a salir de esos bucles mentales, a sentirte comprendido y a tomar decisiones más
            conscientes.
          </p>

          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-3xl p-8 md:p-12">
            <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 italic leading-relaxed">
              "No esperaba llorar. Pero me ayudó a decidir."
            </blockquote>
            <p className="text-slate-600 mt-4">— Usuario de Perspectiva</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Empieza tu primera conversación</h2>
            <p className="text-xl opacity-90">Dale a tu mente el espacio que necesita para encontrar claridad</p>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-12 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Probar Perspectiva gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm opacity-75">Sin registro. En 1 minuto puedes sentirte mejor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-800">Perspectiva</span>
          </div>
          <div className="flex space-x-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-800 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-slate-800 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
