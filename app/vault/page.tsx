"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, CheckCircle, Clock, BarChart3 } from "lucide-react";
import Sidebar from "@/component/dashboard/sidebar";
import Header from "@/component/dashboard/DashboardHeader";
import StatsCard from "@/component/dashboard/StartsCard";
import SkillCard from "@/component/dashboard/SkillCard";
import AddSkillCard from "@/component/dashboard/AddSkillCard";
import RecentActivity from "@/component/dashboard/RecentActivity";
import { Skill, getAllSkills, getSkillById } from "@/lib/data";

function DashboardApp() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const data = await getAllSkills();
        setSkills(data.skills);
      } catch (err: any) {
        setError(err.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Optional: fetch a single skill by ID if needed
  useEffect(() => {
    if (!id) return;
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const data = await getSkillById(id as string);
        setSkills([data.skill]); // just override with single item
      } catch (err: any) {
        setError(err.message || "Failed to load skill");
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  if (loading) return <p className="text-gray-500 p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  const statsData = [
    {
      title: "Total Skills",
      value: skills.length.toString(),
      icon: BookOpen,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Completed",
      value: "0",
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      title: "In Progress",
      value: "0",
      icon: Clock,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
    {
      title: "Total Tasks",
      value: "0",
      icon: BarChart3,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          {/* Stats */}
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

          {/* Skills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">Your Skills</h2>
              <div className="flex items-center space-x-4">
                <select className="bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
                  <option>All Categories</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button className="text-slate-400 hover:text-white">
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {skills.slice(0, 3).map((skill) => {
                const completedTasks =  1;
                const totalTasks = skill._count?.tasks ?? 0;
                const progress =
                  totalTasks > 0
                    ? Math.round((completedTasks / totalTasks) * 100)
                    : 0;
                const status: "Completed" | "In Progress" =
                  progress === 100 ? "Completed" : "In Progress";

                let statusColor = "bg-blue-500/20 text-blue-400";
                if (status === "Completed")
                  statusColor = "bg-green-500/20 text-green-400";
                else if (status === "In Progress")
                  statusColor = "bg-yellow-500/20 text-yellow-400";

                return (
                  <div
                    key={skill.id}
                    onClick={() => router.push(`/vault/skills/${skill.id}`)}
                  >
                    <SkillCard
                      title={skill.title}
                      description={skill.description}
                      totalTasks={totalTasks}
                      createdAt={skill.createdAt}
                      progress={progress}
                      completedTasks={completedTasks}
                      status={status}
                      statusColor={statusColor}
                    />
                  </div>
                );
              })}
              <AddSkillCard />
            </div>
          </div>

          <RecentActivity />
        </main>
      </div>
    </div>
  );
}

export default DashboardApp;
