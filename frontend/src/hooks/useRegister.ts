import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthService from "@/services/auth.service";
import type { RegisterRequest } from "@/types/auth";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      AuthService.register(data),

    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          "Registration failed"
      );
    },
  });
};