/**
 * Entity que representa la estructura de datos de un usuario
 */
export class User {
  id!: number;
  email!: string;
  password!: string;
  name?: string | null;
  emailVerified!: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  role!: string;
  createdAt!: Date;
} 