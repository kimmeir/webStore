export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
