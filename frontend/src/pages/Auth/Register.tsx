import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
      subtitle="Register to continue"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("full_name")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.full_name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
        >
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>
    </AuthLayout>
  );
}