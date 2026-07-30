import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthService } from "@/services/auth.service";
import type { RegisterFormData } from "@/validators/register.schema";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormData) =>
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