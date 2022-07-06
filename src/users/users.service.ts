import { Injectable } from '@nestjs/common';
export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'John',
      username: 'mariue',
      password: '12345',
    },
    {
      id: 2,
      name: 'Emily',
      username: 'Chouaib',
      password: '123456',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
