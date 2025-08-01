# Perspectiva - Espejo Cognitivo Impulsado por IA

Perspectiva es una aplicación web emocional impulsada por IA que permite al usuario escribir sus dilemas del día a día y recibir respuestas desde tres perspectivas: un psicólogo, un filósofo y un amigo brutalmente honesto.

## 🧠 ¿Qué es Perspectiva?

Perspectiva es una herramienta de autoconocimiento que analiza patrones mentales, emociones, creencias limitantes y construye con el tiempo un espejo cognitivo del usuario. La app ofrece múltiples perspectivas para cada dilema y herramientas profundas de autoconocimiento:

- **El Psicólogo**: Tono cálido y empático que te ayuda a entender tus emociones
- **El Filósofo**: Perspectiva profunda y abstracta sobre el significado más amplio  
- **El Amigo Honesto**: Directo e informal, te dice las verdades que necesitas escuchar

## ✨ Características Principales

- 🤖 **Tres perspectivas únicas** para cada dilema
- 📊 **Análisis de patrones mentales** y emocionales
- 🧠 **Espejo cognitivo personal** que evoluciona con el tiempo
- 📌 **Módulo "Raíces"**: Visualiza el origen emocional de los problemas
- 💣 **Módulo "Antídoto"**: Desmonta creencias desde múltiples puntos de vista
- 🔄 **Comparador "Yo vs Yo pasado"**: Seguimiento de evolución mental
- 📈 **Seguimiento emocional** y análisis de tendencias
- 🎨 **Interfaz emocional y minimalista**
- 🌙 **Modo oscuro/claro** con transiciones suaves
- 📱 **Completamente responsive** para móviles y desktop
- 💎 **Modalidades gratuitas y premium**

## 🛠️ Tecnologías

### Frontend
- **Next.js 14** - Framework de React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **ShadCN/UI** - Componentes de UI accesibles
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Next Themes** - Gestión de temas
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Backend
- **NestJS** - Framework de Node.js para APIs
- **REST API** - Arquitectura de API
- **Prisma** - ORM para base de datos
- **TypeScript** - Tipado estático

### Base de Datos
- **PostgreSQL** - Base de datos principal (o MySQL)

### IA y Autenticación
- **OpenAI API** - Integración con IA
- **NLP personalizado** - Procesamiento de lenguaje natural
- **Clerk/Auth.js** - Autenticación (Google + email/password)
- **Firebase** - Alternativa de autenticación

### Despliegue
- **Vercel** - Plataforma de hosting

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o pnpm
- PostgreSQL (o MySQL)

### Instalación Completa

1. **Clona el repositorio**
```bash
git clone https://github.com/tuusuario/perspectiva.git
cd perspectiva
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env
# Edita .env con tus credenciales de API y base de datos
```

4. **Ejecuta el servidor en desarrollo**
```bash
npm run dev
```

5. **Abre tu navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
perspectiva-app/
├── apps/
│   ├── frontend/                 # Aplicación Next.js
│   │   ├── app/                  # App Router de Next.js
│   │   │   ├── login/           # Página de login
│   │   │   ├── app/             # Rutas protegidas
│   │   │   │   ├── antidoto/    # Página principal de la app
│   │   │   │   └── historial/   # Historial de conversaciones
│   │   │   └── page.tsx         # Landing page
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── ui/             # Componentes de UI base
│   │   │   ├── mirror/         # Componentes específicos del espejo
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilidades
│   │   └── styles/             # Estilos globales
│   └── backend/                # API Backend (en desarrollo)
│       ├── src/
│       └── prisma/
├── packages/                   # Paquetes compartidos
└── docs/                      # Documentación
```

## 🎯 Páginas Principales

### Landing Page (`/`)
- Presentación del producto
- Explicación de los tres mentores
- Call-to-action para empezar

### Login (`/login`)
- Formulario de autenticación
- Diseño moderno y accesible

### App Principal (`/app/antidoto`)
- Interfaz principal para escribir dilemas
- Visualización de respuestas de los mentores
- Sistema de navegación

### Módulo Raíces (`/app/raices`)
- Visualización del origen emocional de los problemas
- Análisis de patrones profundos

### Módulo Antídoto (`/app/antidoto`)
- Desmontaje de creencias limitantes
- Múltiples perspectivas para cada creencia

### Comparador Personal (`/app/comparador`)
- Comparación "Yo vs Yo pasado"
- Seguimiento de evolución mental

### Historial (`/app/historial`)
- Historial de conversaciones previas
- Análisis de tendencias emocionales
- Búsqueda y filtros avanzados

## 🎨 Componentes Principales

### UI Components
- **Button** - Botones con variantes
- **Card** - Contenedores de contenido
- **Dialog** - Modales y popups
- **Form** - Formularios con validación
- **Navigation** - Navegación principal

### Mirror Components
- **MirrorBox** - Contenedor principal del espejo cognitivo
- **EmotionGraph** - Gráfico de emociones y tendencias
- **PatternCard** - Tarjetas de patrones mentales
- **QuoteBubble** - Burbujas de citas y reflexiones
- **SessionEvolution** - Evolución de la sesión
- **RootsAnalyzer** - Analizador de raíces emocionales
- **AntidoteModule** - Módulo de desmontaje de creencias
- **PersonalComparator** - Comparador personal "Yo vs Yo pasado"

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter

# Limpieza
npm cache clean --force  # Limpia la caché de npm
rm -rf node_modules      # Elimina node_modules
```

## 🐛 Solución de Problemas

### Error de Hidratación
Si ves errores de hidratación relacionados con el tema:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Conflictos de Dependencias
Si hay conflictos con React 19:
```bash
npm install --legacy-peer-deps
```

## 🚧 Estado del Proyecto

### ✅ Completado
- [x] Landing page responsive
- [x] Sistema de temas (claro/oscuro)
- [x] Componentes de UI base
- [x] Página de login
- [x] Navegación principal
- [x] Estructura de la aplicación
- [x] Interfaz emocional y minimalista

### 🚧 En Desarrollo
- [ ] Backend NestJS API
- [ ] Base de datos PostgreSQL
- [ ] Autenticación con Clerk/Auth.js
- [ ] Integración con OpenAI API
- [ ] Módulo "Raíces" - Análisis de patrones
- [ ] Módulo "Antídoto" - Desmontaje de creencias
- [ ] Comparador "Yo vs Yo pasado"
- [ ] Seguimiento emocional avanzado
- [ ] Espejo cognitivo personal

### 📋 Pendiente
- [ ] Tests unitarios y de integración
- [ ] CI/CD pipeline con Vercel
- [ ] Documentación de API
- [ ] Optimización de performance
- [ ] Modalidades premium
- [ ] NLP personalizado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: [Perspectiva](https://github.com/tuusuario/perspectiva)
- **Issues**: [GitHub Issues](https://github.com/tuusuario/perspectiva/issues)

---

**Perspectiva** - Espejo Cognitivo Impulsado por IA 🧠✨ 