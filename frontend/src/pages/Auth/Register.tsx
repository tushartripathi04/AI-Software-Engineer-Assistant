import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/auth.service";

import {
  registerSchema,
  type RegisterFormData,
} from "../../lib/validators/register";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      const { confirmPassword, ...payload } = data;

      return AuthService.register(payload);
    },

    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ??
          "Registration failed"
      );
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to get started"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Full Name
          </label>

          <input
            id="full_name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            {...register("full_name")}
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

          {errors.full_name && (
            <p className="mt-2 text-sm text-red-500">
              {errors.full_name.message}
            </p>
          )}
        </div>

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
            placeholder="Create a password"
            autoComplete="new-password"
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
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
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

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
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
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-7 border-t border-theme pt-6 text-center">
        <p className="text-sm text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-medium
              text-[#d4a72c]
              transition-colors
              hover:text-[#c49a25]
            "
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}