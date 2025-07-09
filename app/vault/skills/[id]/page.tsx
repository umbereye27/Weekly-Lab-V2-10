"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AddTaskForm } from "@/component/skills/AddTask-form";
import { ReflectionSection } from "@/component/skills/ReflectionSection";
import { TaskSection } from "@/component/skills/TaskSection";
import { OverviewSection } from "@/component/skills/OverViewSection";

export default function SkillDetailPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Skills</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">
                  {skillData.title}
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Skill Header */}
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {skillData.title}
                  </h1>
                  <p className="text-gray-500">{skillData.category}</p>
                </div>
              </div>
              <p className="text-gray-700 max-w-3xl leading-relaxed">
                {skillData.description}
              </p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {skillData.totalTasks}
              </div>
              <div className="text-gray-500 text-sm">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {skillData.totalHours}
              </div>
              <div className="text-gray-500 text-sm">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {skillData.progress}%
              </div>
              <div className="text-gray-500 text-sm">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {skillData.status}
              </div>
              <div className="text-gray-500 text-sm">Status</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Progress</span>
              <span className="text-gray-700 text-sm">
                {skillData.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${skillData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { id: "overview", label: "Overview" },
              { id: "tasks", label: "Tasks" },
              { id: "reflection", label: "Reflection" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "tasks" && <TaskSection />}
        {activeTab === "reflection" && <ReflectionSection />}
        {activeTab === "overview" && <OverviewSection />}
      </div>
    </div>
  );
}
