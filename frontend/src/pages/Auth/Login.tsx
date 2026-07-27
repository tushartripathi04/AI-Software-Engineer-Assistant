import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import AuthLayout from "../../layouts/AuthLayout";
import AuthService from "../../services/auth.service";

import { loginSchema } from "../../lib/validators/auth";
import type { LoginFormData } from "../../lib/validators/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });


    // remaining code


  const loginMutation = useMutation({
    mutationFn: AuthService.login,

    onSuccess: () => {
      toast.success("Login successful!");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ??
          "Login failed"
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
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

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

         {
    loginMutation.isError && (
        <p className="text-sm text-red-500 mt-2">
            Invalid email or password
        </p>
    )
}

        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loginMutation.isPending
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}