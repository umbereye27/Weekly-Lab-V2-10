"use client";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const AddSKillForm = () => {
  return (
    <form className="w-full my-29 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Skill</h2>

      <div className="space-y-2">
        <label
          htmlFor="addSkillTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Skill Title
        </label>
        <Input
          id="addSkillTitle"
          placeholder="e.g: Master ReactJS"
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="addSKillDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="addSKillDescription"
          placeholder="Add a small description"
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* You can add dynamic objectives here if needed later */}

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          className="bg-gray-100 text-gray-700"
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
