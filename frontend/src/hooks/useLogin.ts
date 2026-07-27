import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth.service";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => AuthService.login(data),

    onSuccess: () => {
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};