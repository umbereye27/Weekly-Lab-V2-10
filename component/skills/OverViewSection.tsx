import { CheckCircle, Circle } from "lucide-react";
import { TaskSection } from "./TaskSection";
import { ReflectionSection } from "./ReflectionSection";
import { Reflection, Task } from "@/generated/prisma";

export const OverviewSection = ({
  recievedTasks,
  recievedReflections,
}: {
  recievedTasks: Task[];
  recievedReflections: Reflection[];
}) => {
  const skillData = {
    title: "JavaScript Advanced Concepts",
    category: "JS Mastery",
    description:
      "Master advanced JavaScript concepts including closures, prototypes, async/await, and modern ESM features. This comprehensive skill covers complex programming patterns and best practices for building scalable applications.",
    totalTasks: 12,
    completedTasks: 8,
    totalHours: 40,
    progress: 66,
    status: "In Progress",
  };

  const tasks = [
    {
      id: 1,
      title: "Learn about Closures",
      dueDate: "Dec 15th, 2024",
      completed: true,
      priority: "high",
    },
    {
      id: 2,
      title: "Understand Prototypal Inheritance",
      dueDate: "Dec 20, 2024",
      completed: false,
      priority: "medium",
    },
    {
      id: 3,
      title: "Master Async/Await Patterns",
      dueDate: "Dec 25, 2024",
      completed: false,
      priority: "high",
    },
  ];

  const reflections = [
    {
      id: 1,
      date: "Dec 10, 2024 • 2:30 PM",
      mood: "Happy",
      text: "Finally understood how closures work! The concept of lexical scoping makes so much more sense now. I was able to implement a counter function using closures and it felt like a breakthrough moment.",
      moodColor: "text-yellow-500",
    },
    {
      id: 2,
      date: "Dec 8, 2024 • 4:15 PM",
      mood: "Confused",
      text: "Prototypal chain is still confusing. Need to practice more with examples. The relationship between __proto__ and prototype property needs more clarification.",
      moodColor: "text-orange-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
      <TaskSection tasks={recievedTasks} />
      <ReflectionSection reflections={recievedReflections} />
    </div>
  );
};
