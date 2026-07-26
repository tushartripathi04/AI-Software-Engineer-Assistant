// import api from "@/lib/axios";
// import {
//   LoginRequest,
//   RegisterRequest,
//   LoginResponse,
// } from "@/types/auth";

// class AuthService {
//   async register(data: RegisterRequest) {
//     const response = await api.post("/auth/register", data);
//     return response.data;
//   }

//   async login(data: LoginRequest): Promise<LoginResponse> {
//     const response = await api.post("/auth/login", data);

//     localStorage.setItem(
//       "access_token",
//       response.data.access_token
//     );

//     return response.data;
//   }

//   logout() {
//     localStorage.removeItem("access_token");
//   }

//   isAuthenticated() {
//     return !!localStorage.getItem("access_token");
//   }
// }

// export default new AuthService();
import api from "../lib/axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../types/auth";

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<User> {
    const response = await api.post<User>("/auth/register", data);
    return response.data;
  }

  /**
   * Login user
   * Backend expects OAuth2PasswordRequestForm
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const formData = new URLSearchParams();

    // FastAPI OAuth2PasswordRequestForm expects:
    // username -> email
    // password -> password
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

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("access_token");
  }

  /**
   * Check authentication status
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  }

  /**
   * Get stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem("access_token");
  }
}

export default new AuthService();