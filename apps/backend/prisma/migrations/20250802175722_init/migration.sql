-- CreateEnum
CREATE TYPE "public"."MentorTipo" AS ENUM ('psicologo', 'filosofo', 'amigo');

-- CreateEnum
CREATE TYPE "public"."TipoPensamiento" AS ENUM ('creencia', 'juicio', 'etiqueta', 'suposicion', 'interpretacion', 'generalizacion', 'profecia', 'impulso', 'necesidad', 'deseo', 'intencion', 'objetivo', 'meta', 'proposito', 'valor', 'norma', 'ideal', 'mandato', 'razonamiento', 'justificacion', 'explicacion', 'historia_personal', 'recuerdo', 'experiencia_pasada', 'comparacion', 'catastrofe', 'autoexigencia', 'victimismo', 'desesperanza', 'rumiacion', 'obsesion', 'negacion');

-- CreateEnum
CREATE TYPE "public"."TipoEmocion" AS ENUM ('miedo', 'culpa', 'tristeza', 'verguenza', 'frustracion', 'ira', 'ansiedad', 'alegria', 'esperanza', 'sorpresa', 'alivio', 'resignacion', 'euforia', 'nostalgia', 'celos', 'rechazo', 'aburrimiento', 'inseguridad', 'gratitud', 'afecto');

-- CreateEnum
CREATE TYPE "public"."TipoRaiz" AS ENUM ('infancia', 'miedo_al_rechazo', 'baja_autoestima', 'trauma_pasado', 'condicionamiento_social', 'exigencia_parental', 'comparacion_constante', 'necesidad_de_control', 'perfeccionismo', 'dependencia_emocional', 'inseguridad', 'soledad', 'abandono', 'idealizacion', 'culpa_inconsciente', 'fracaso_no_resuelto', 'carencia_afectiva', 'miedo_al_conflicto', 'rechazo_anterior', 'juicio_social');

-- CreateEnum
CREATE TYPE "public"."TipoPatron" AS ENUM ('autoexigencia', 'catastrofismo', 'perfeccionismo', 'pensamiento_dicotomico', 'lectura_de_mente', 'sobregeneralizacion', 'filtro_negativo', 'culpabilizacion', 'deberias', 'personalizacion', 'rumiacion', 'desesperanza', 'evitacion', 'validacion_externa', 'indecision_cronica', 'negacion', 'juicio_permanente', 'comparacion_toxica', 'autosabotaje', 'hiperresponsabilidad');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Perfil" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bienestar" INTEGER NOT NULL,
    "autoconocimiento" INTEGER NOT NULL,
    "gestionEmocional" INTEGER NOT NULL,
    "dilemasTotales" INTEGER NOT NULL DEFAULT 0,
    "creenciasTransformadas" INTEGER NOT NULL DEFAULT 0,
    "diasActivo" INTEGER NOT NULL DEFAULT 0,
    "progresoEmocional" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dilema" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dilema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Respuesta" (
    "id" SERIAL NOT NULL,
    "dilemaId" INTEGER NOT NULL,
    "mentorTipo" "public"."MentorTipo" NOT NULL,
    "contenido" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Respuesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pensamiento" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "padreId" INTEGER,
    "contenido" TEXT NOT NULL,
    "tipo" "public"."TipoPensamiento" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pensamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Emocion" (
    "id" SERIAL NOT NULL,
    "dilemaId" INTEGER NOT NULL,
    "tipo" "public"."TipoEmocion" NOT NULL,
    "intensidad" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emocion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Raiz" (
    "id" SERIAL NOT NULL,
    "dilemaId" INTEGER NOT NULL,
    "origen" "public"."TipoRaiz" NOT NULL,
    "certeza" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Raiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Patron" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tipo" "public"."TipoPatron" NOT NULL,
    "frecuencia" INTEGER NOT NULL DEFAULT 1,
    "ultimaDetectada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patron_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_userId_key" ON "public"."Perfil"("userId");

-- AddForeignKey
ALTER TABLE "public"."Perfil" ADD CONSTRAINT "Perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dilema" ADD CONSTRAINT "Dilema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Respuesta" ADD CONSTRAINT "Respuesta_dilemaId_fkey" FOREIGN KEY ("dilemaId") REFERENCES "public"."Dilema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pensamiento" ADD CONSTRAINT "Pensamiento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pensamiento" ADD CONSTRAINT "Pensamiento_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "public"."Pensamiento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Emocion" ADD CONSTRAINT "Emocion_dilemaId_fkey" FOREIGN KEY ("dilemaId") REFERENCES "public"."Dilema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Raiz" ADD CONSTRAINT "Raiz_dilemaId_fkey" FOREIGN KEY ("dilemaId") REFERENCES "public"."Dilema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Patron" ADD CONSTRAINT "Patron_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
