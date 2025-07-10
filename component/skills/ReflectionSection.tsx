import { Plus, Edit, Trash2 } from "lucide-react";
import { AddReflectionForm } from "./Add-Reflection-Form";
import { Reflection } from "@/generated/prisma";

export const ReflectionSection = ({
  reflections,
}: {
  reflections: Reflection[];
}) => {
  console.log("These are reflections: ", reflections);
  return (
    <div className="space-y-6">
      {/* Add Reflection */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-xl font-semibold text-gray-900">
            Learning Reflections
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors invisible">
            <Plus className="w-4 h-4" />
            <span>Add Reflection</span>
          </button>
        </div>

        <AddReflectionForm />
      </div>

      {/* Reflections List */}
      <div className="space-y-4">
        {reflections &&
          reflections.map(({ content, createdAt, id }) => (
            <div
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              key={id}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">😊</div>
                  <div>
                    <p className="text-gray-500 text-sm">
                      {new Date(createdAt).toDateString()}
                    </p>
                  </div>
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
              <p className="text-gray-700 leading-relaxed">{content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
