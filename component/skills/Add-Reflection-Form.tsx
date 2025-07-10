"use client";

import { createReflection } from "@/lib/data";
import { reflectionSchema, ReflectionSchemaProps } from "@/lib/validation";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
export const AddReflectionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ReflectionSchemaProps>({
    resolver: zodResolver(reflectionSchema),
  });
  const { id } = useParams();
  const onSubmit: SubmitHandler<ReflectionSchemaProps> = async (data) => {
    const res = await createReflection({
      content: data.content,
      skillId: String(id),
    });
    if (res.message.includes("successfully")) {
      console.log("called");
      window.location.reload();
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <textarea
          placeholder="Share your thoughts about the learning process..."
          className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none h-32"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 text-sm">Mood:</span>
          <select className="bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:border-blue-500 focus:outline-none">
            <option value="Happy">😊 Happy</option>
            <option value="Confused">😕 Confused</option>
            <option value="Excited">🤩 Excited</option>
            <option value="Frustrated">😤 Frustrated</option>
          </select>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
          {isSubmitting && (
            <Loader2
              className="animate-spin mr-2"
              size={18}
              strokeWidth={1.3}
            />
          )}
          Save Reflection
        </button>
      </div>
    </form>
  );
};
