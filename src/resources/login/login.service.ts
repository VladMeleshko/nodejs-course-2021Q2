import loginRepo from './login.memory.repository';

const autoriseUser = (login: string, password: string): Promise<any> =>
  loginRepo.autoriseUser(login, password);

export default { autoriseUser };
