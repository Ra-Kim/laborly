export interface ISignUp {
  email: string;
  phone_number: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface ISignUpRes {
  access_token: string;
  user: {
    id: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    role: "CLIENT" | "WORKER";
    created_at: string;
    updated_at: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}
