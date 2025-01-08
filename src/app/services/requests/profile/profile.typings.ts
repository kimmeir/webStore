export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  email: string | null;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string;
  avatar: string;
  stripeId?: string;
  billAddress?: IAddress;
  shipAddress?: IAddress;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IAddress {
  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  zip: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}
