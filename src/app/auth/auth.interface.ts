export interface IUser {
  username: string;
  password: string;
}

export interface IServerLoginResponse {
  token: string;
  type: string;
  username: string;
}
