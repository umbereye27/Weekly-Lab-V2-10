"use client";

import { Edit, Trash2, Clock } from "lucide-react";

interface SkillCardProps {
  title: string;
  category: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  status: "In Progress" | "Completed";
  lastActivity: string;
  statusColor: string;
}

const SkillCard = ({
  title,
  category,
  progress,
  totalTasks,
  completedTasks,
  status,
  lastActivity,
  statusColor,
}: SkillCardProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-slate-400 text-sm">{category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Progress</span>
          <span className="text-white text-sm">
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-sm">{lastActivity}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default SkillCard;
