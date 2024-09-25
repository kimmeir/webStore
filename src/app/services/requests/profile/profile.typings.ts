export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}
