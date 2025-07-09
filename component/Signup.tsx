"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, RegisterSchemaProps } from "@/lib/validation";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaProps>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaProps> = async ({
    name,
    email,
    password,
  }) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const result = await res.json();

      if (!res.ok) {
        // Handle error responses
        if (result.error?.includes("already exists")) {
          return setError("root", { message: "User already exists" });
        }
        return setError("root", {
          message: result.error || "Registration failed",
        });
      }

      // Success - redirect to login/home page
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("root", { message: "There was an error. Please try again" });
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
          <p className="text-gray-400 text-sm">Create your learning account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-md text-sm">
              {errors.root.message}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm text-white mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-[#21262D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="********"
              className="w-full px-4 py-2 bg-[#21262D] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-200 flex items-center justify-center"
          >
            {isSubmitting && (
              <Loader2
                className="animate-spin mr-2"
                size={18}
                strokeWidth={1.3}
              />
            )}
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/" className="text-purple-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
