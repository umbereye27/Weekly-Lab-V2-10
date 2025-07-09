"use client";

import { useState } from "react";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
// import { fetchWithAuth } from "@/utils/api";
import { Form, FormField, FormLabel, FormMessage } from "@/component/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillId: string;
  onTaskCreated: (task: any) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  skillId,
  onTaskCreated,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await fetchWithAuth("/api/tasks", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, description, skillId }),
  //     });

  //     onTaskCreated(response);
  //     setTitle("");
  //     setDescription("");
  //   } catch (error) {
  //     setError("Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a specific task to work on for this skill
          </DialogDescription>
        </DialogHeader>
        <Form>
          {/* onSubmit={handleSubmit} */}
          <FormField>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn React hooks"
              required
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about this task..."
              rows={3}
            />
          </FormField>

          {error && <FormMessage>{error}</FormMessage>}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
