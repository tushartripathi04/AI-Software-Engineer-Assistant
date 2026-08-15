import api from "../lib/axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth";
class AuthService {
  async register(data: RegisterRequest): Promise<User> {
    const response = await api.post<User>("/auth/register", data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    formData.append("username", data.email);
    formData.append("password", data.password);

    const response = await api.post<LoginResponse>(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/me");
    return response.data;
  }

  logout(): void {
    localStorage.removeItem("access_token");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }
}

export default new AuthService();