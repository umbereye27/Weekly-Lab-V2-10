"use client";

import { CheckCircle, Plus, Edit3 } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "completed" | "added" | "reflection";
  title: string;
  subtitle: string;
  time: string;
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "completed",
      title: 'Completed "Build REST API endpoints"',
      subtitle: "Node.js API",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "added",
      title: 'Added new task "Learn Container Networking"',
      subtitle: "Docker Fundamentals",
      time: "1 day ago",
    },
    {
      id: "3",
      type: "reflection",
      title: "Added reflection note",
      subtitle: "React Advanced",
      time: "3 days ago",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "added":
        return <Plus className="w-5 h-5 text-blue-500" />;
      case "reflection":
        return <Edit3 className="w-5 h-5 text-purple-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h2 className="text-white font-semibold text-lg mb-6">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg"
          >
            <div className="flex-shrink-0 mt-1">{getIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium mb-1">
                {activity.title}
              </p>
              <p className="text-slate-400 text-xs">
                {activity.subtitle} • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
