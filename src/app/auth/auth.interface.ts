export interface IUser {
  username: string;
  password: string;
  role: string[];
}

export interface IServerLoginResponse {
  roles: string;
  token: string;
  type: string;
  username: string;
}
