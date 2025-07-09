import { Plus, CheckCircle, Circle, Edit, Trash2 } from "lucide-react";
import { AddTaskForm } from "./AddTask-form";
import Link from "next/link";
export const TaskSection = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <Link href="/vault/skills/addSkills">Add Task</Link>
        </button>
      </div>

      {/* Add Task Form */}
      <AddTaskForm />

      {/* Tasks List (static examples) */}
      <div className="space-y-3 mt-6">
        {/* Task 1 - Completed */}
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <button className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </button>
          <div className="flex-1">
            <h3 className="font-medium text-gray-400 line-through">
              Complete UI cleanup
            </h3>
            <p className="text-gray-500 text-sm">Due 2025-07-10</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-200 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task 2 - Incomplete */}
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <button className="flex-shrink-0">
            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-700" />
          </button>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Write documentation</h3>
            <p className="text-gray-500 text-sm">Due 2025-07-12</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-200 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
