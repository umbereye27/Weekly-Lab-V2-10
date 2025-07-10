"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSkill } from "@/lib/data";
import { skillSchema, SkillSchemaProps } from "@/lib/validation";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddSkillForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setLocalError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillSchemaProps>({
    resolver: zodResolver(skillSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SkillSchemaProps> = async ({
    title,
    description,
  }) => {
    setLocalError("");
    setSuccess(false);
    try {
      await createSkill({ title, description });
      setSuccess(true);
      reset();
      router.push("/vault");
    } catch (err: any) {
      setLocalError(err.message || "Failed to add skill");
    }
  };
  router.push("/vault");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Skill</h2>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          Skill added successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Skill Title
        </label>
        <Input
          id="title"
          placeholder="e.g. Master ReactJS"
          {...register("title")}
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Add a short description"
          {...register("description")}
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          className="bg-gray-100 text-gray-700"
          onClick={() => reset()}
        >
          Clear
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting && (
            <Loader2
              className="animate-spin mr-2"
              size={18}
              strokeWidth={1.3}
            />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};
