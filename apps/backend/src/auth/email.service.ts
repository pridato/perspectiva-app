import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

@Injectable()
/**
 * Servicio para manejar el envío de emails
 */
export class EmailService {

  /**
   * Genera un token de verificación de email
   * @returns Token aleatorio de 32 caracteres
   */
  generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Genera la fecha de expiración del token (24 horas)
   * @returns Fecha de expiración
   */
  generateExpirationDate(): Date {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    return expiration;
  }

  /**
   * Envía email de confirmación (simulado)
   * @param email - Email del usuario
   * @param token - Token de verificación
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    await resend.emails.send({
      from: `Perspectiva <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: 'Verifica tu email',
      html: `
        <h1>¡Bienvenido a Perspectiva!</h1>
        <a href="${process.env.FRONTEND_URL}/auth/verify-email?token=${token}">Verificar Email</a>
        <div style="font-size: 12px; color: #666;">${process.env.FRONTEND_URL}/auth/verify-email?token=${token}</div>
      `
    });
  }

  /**
   * Envía email de bienvenida
   * @param email - Email del usuario
   * @param name - Nombre del usuario
   */
  async sendWelcomeEmail(email: string, name?: string): Promise<void> {
    // TODO: Implementar envío real de email
    console.log('🎉 Email de bienvenida enviado:');
    console.log(`Para: ${email}`);
    console.log(`Mensaje: ¡Bienvenido ${name || 'usuario'} a Perspectiva!`);
    
    return Promise.resolve();
  }

  /**
   * Envía email de reset de contraseña
   * @param email - Email del usuario
   * @param token - Token de reset de contraseña
   */
  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    await resend.emails.send({
      from: `Perspectiva <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: 'Restablece tu contraseña',
      html: `
        <h1>Restablece tu contraseña</h1>
        <p>Has solicitado restablecer tu contraseña en Perspectiva.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <a href="${process.env.FRONTEND_URL}/auth/reset-password/confirm?token=${token}">Restablecer contraseña</a>
        <div style="font-size: 12px; color: #666;">${process.env.FRONTEND_URL}/auth/reset-password/confirm?token=${token}</div>
        <p>Este enlace expirará en 24 horas.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
      `
    });
  }
} 