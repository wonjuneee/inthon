import { LoginData } from '../type/login-data.type';
import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  @ApiProperty({
    description: 'username',
    type: String,
  })
  username!: string;

  static from(user: LoginData) {
    return {
      username: user.username,
    };
  }

  static fromArray(users: LoginData[]) {
    return users.map((user) => this.from(user));
  }
}

export class UserListDto {
  @ApiProperty({
    description: 'username',
    type: [LoginReqDto],
  })
  users!: LoginReqDto[];

  static from(users: LoginData[]): UserListDto {
    return {
      users: LoginReqDto.fromArray(users),
    };
  }
}
