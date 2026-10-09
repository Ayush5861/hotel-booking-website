export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "guest" | "owner";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  role: "guest" | "owner" | "admin";
}