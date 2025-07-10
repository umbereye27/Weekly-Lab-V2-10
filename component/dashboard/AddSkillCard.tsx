"use client";
import Link from "next/link";
import { Plus } from "lucide-react";

const AddSkillCard = () => {
  return (
    <Link href={"/vault/skills/addSkills"}>
      <div className="bg-slate-800 rounded-xl p-3 border-2 border-dashed border-slate-600 hover:border-slate-500 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center h-full min-h-[80px] text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-slate-600 transition-colors">
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-slate-300" />
          </div>
          <h3 className="text-white font-semibold mb-2">Add New Skill</h3>
          <p className="text-slate-400 text-sm">
            Start tracking a new learning goal
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AddSkillCard;
