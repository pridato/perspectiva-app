export interface UserDto {
    id: number;
    email: string;
    name: string | null;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
  }