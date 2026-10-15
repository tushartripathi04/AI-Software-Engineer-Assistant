
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthService from "@/services/auth.service";
import type { RegisterRequest } from "@/types/auth";

interface ApiErrorResponse {
  detail?: string;
}

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      AuthService.register(data),

    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },

    onError: (error: Error) => {
      const apiError = error as AxiosError<ApiErrorResponse>;
      const message = apiError.response?.data?.detail;

      toast.error(message || "Registration failed");
    },
  });
};
