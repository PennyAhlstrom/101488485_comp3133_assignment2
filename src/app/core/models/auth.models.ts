export interface User {
  id: string;
  username: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  username: string;
  email: string;
  password: string;
}