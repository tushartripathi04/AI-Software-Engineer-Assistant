import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/auth.service";

import {
  loginSchema,
  type LoginFormData,
} from "../../lib/validators/auth";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,

    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ?? "Login failed"
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your engineering workspace"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className="
              w-full rounded-xl
              border border-theme
              bg-input
              px-4 py-3.5
              text-sm text-primary
              placeholder:text-muted
              outline-none
              transition-all duration-200
              focus:border-[#d4a72c]
              focus:ring-1
              focus:ring-[#d4a72c]/30
            "
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
            className="
              w-full rounded-xl
              border border-theme
              bg-input
              px-4 py-3.5
              text-sm text-primary
              placeholder:text-muted
              outline-none
              transition-all duration-200
              focus:border-[#d4a72c]
              focus:ring-1
              focus:ring-[#d4a72c]/30
            "
          />

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {loginMutation.isError && (
            <p className="mt-2 text-sm text-red-500">
              Invalid email or password.
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="
            w-full rounded-xl
            border border-[#d4a72c]/30
            bg-[#d4a72c]
            px-4 py-3.5
            text-sm font-semibold
            text-white
            transition-all duration-200
            hover:bg-[#c49a25]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loginMutation.isPending
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-6 border-t border-theme pt-6 text-center">
        <p className="text-sm text-secondary">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="
              font-semibold
              text-[#d4a72c]
              transition-colors
              hover:text-[#c49a25]
            "
          >
            Create an account
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}