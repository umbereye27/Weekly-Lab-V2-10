import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const skillSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  skillId: z.string().optional(),
  createdAt: z.string().nonempty({ message: "The date is required" }),
});

export const reflectionSchema = z.object({
  content: z.string().min(1, "Content is required"),
  skillId: z.string().optional(),
});
export type TaskSchemaProps = z.infer<typeof taskSchema>;
export type RegisterSchemaProps = z.infer<typeof signUpSchema>;
export type LoginSchemaProps = z.infer<typeof signInSchema>;
export type SkillSchemaProps = z.infer<typeof skillSchema>;
export type ReflectionSchemaProps = z.infer<typeof reflectionSchema>;
