"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, LoginSchemaProps } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<LoginSchemaProps> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res.error) {
      setError("root", { message: "Invalid email or password!" });
    } else {
      router.push("/vault");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="w-full max-w-sm bg-[#161B22] p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9z" />
              <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-semibold">SkillVault</h1>
          <p className="text-gray-400 text-sm">Track your learning journey</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-[#21262D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password")}
              className="w-full px-4 py-2 bg-[#21262D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="accent-purple-600"
            />
            <label htmlFor="remember" className="text-sm text-white">
              Remember me
            </label>
          </div>

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-200 flex items-center justify-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2
                className="animate-spin mr-2"
                size={18}
                strokeWidth={1.3}
              />
            )}
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-purple-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
