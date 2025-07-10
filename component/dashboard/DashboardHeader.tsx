"use client";
import Link from "next/link";
import { Search, Plus } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-slate-400">Track your learning progress</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search skills..."
              className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-64"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <Link href={"/vault/skills/addSkills"}>Add Skills</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
