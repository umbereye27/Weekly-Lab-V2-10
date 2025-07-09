"use client";
import React, { useState } from "react";
import { BookOpen, CheckCircle, Clock, BarChart3 } from "lucide-react";
import Sidebar from "@/component/dashboard/sidebar";
import Header from "@/component/dashboard/DashboardHeader";
import StatsCard from "@/component/dashboard/StartsCard";
import SkillCard from "@/component/dashboard/SkillCard";
import AddSkillCard from "@/component/dashboard/AddSkillCard";
import RecentActivity from "@/component/dashboard/RecentActivity";

function App() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const statsData = [
    {
      title: "Total Skills",
      value: "12",
      icon: BookOpen,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Completed",
      value: "7",
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      title: "In Progress",
      value: "5",
      icon: Clock,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
    {
      title: "Total Tasks",
      value: "47",
      icon: BarChart3,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
  ];

  const skillsData = [
    {
      title: "React Advanced",
      category: "Frontend Development",
      progress: 70,
      totalTasks: 10,
      completedTasks: 7,
      status: "In Progress" as const,
      lastActivity: "Started 2 weeks ago",
      statusColor: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Node.js API",
      category: "Backend Development",
      progress: 100,
      totalTasks: 12,
      completedTasks: 12,
      status: "Completed" as const,
      lastActivity: "Completed 1 week ago",
      statusColor: "bg-green-500/20 text-green-400",
    },
    {
      title: "Docker Fundamentals",
      category: "DevOps",
      progress: 30,
      totalTasks: 8,
      completedTasks: 3,
      status: "In Progress" as const,
      lastActivity: "Started 3 days ago",
      statusColor: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconColor={stat.iconColor}
                bgColor={stat.bgColor}
              />
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">Your Skills</h2>
              <div className="flex items-center space-x-4">
                <select className="bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option>All Categories</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>
                  <option>DevOps</option>
                </select>
                <button className="text-slate-400 hover:text-white">
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.map((skill, index) => (
                <SkillCard
                  key={index}
                  title={skill.title}
                  category={skill.category}
                  progress={skill.progress}
                  totalTasks={skill.totalTasks}
                  completedTasks={skill.completedTasks}
                  status={skill.status}
                  lastActivity={skill.lastActivity}
                  statusColor={skill.statusColor}
                />
              ))}
              <AddSkillCard />
            </div>
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </main>
      </div>
    </div>
  );
}

export default App;
