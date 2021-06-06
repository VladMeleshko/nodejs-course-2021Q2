import { v4 as uuid } from 'uuid';

export interface UserInfo {
  name: string;
  login: string;
}

export interface UserAccount extends UserInfo {
  id: string;
}

export interface UserModel extends UserInfo {
  id: string;
  password: string;
}

interface UserCredentials extends UserInfo {
  password: string;
}

class User {
  id: UserModel['id'];

  name: UserModel['name'];

  login: UserModel['login'];

  password: UserModel['password'];

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' }: UserCredentials) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: UserModel): UserAccount {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
