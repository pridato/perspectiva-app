import { UserDto } from '../user/user.dto';

export interface AuthResponseDto {
  user: UserDto;
  token: string;
}