"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "@/lib/data";
import { taskSchema, TaskSchemaProps } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddTaskForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setLocalError] = useState("");
  const router = useRouter();
  const { id: skillId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskSchemaProps>({
    resolver: zodResolver(taskSchema),
  });
  //  SubmitHandler<TaskSchemaProps>
  const onSubmit: SubmitHandler<TaskSchemaProps> = async ({
    title,
    createdAt,
  }) => {
    const res = await createTask({
      title,
      createdAt,
      skillId: String(skillId ?? ""),
    });
    if (res.task) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Task</h2>

      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
          Task added successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Title Field */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title x
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

      {/* Date Field */}
      <div className="space-y-2">
        <label
          htmlFor="createdAt"
          className="block text-sm font-medium text-gray-700"
        >
          Created Date
        </label>
        <Input
          id="createdAt"
          type="date"
          {...register("createdAt")}
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* {errors.createdAt && (
          <p className="text-red-500 text-sm">{errors.createdAt.message}</p>
        )} */}
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          className="bg-gray-100 text-gray-700"
          onClick={() => reset()}
        >
          Clear
        </Button>
        <Button
          type="submit"
          // disabled={isSubmitting}
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
