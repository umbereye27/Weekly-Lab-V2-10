import { Plus, Edit, Trash2 } from "lucide-react";

export const ReflectionSection = () => {
  return (
    <div className="space-y-6">
      {/* Add Reflection */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Learning Reflections
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Reflection</span>
          </button>
        </div>

        <div className="space-y-4">
          <textarea
            placeholder="Share your thoughts about the learning process..."
            className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none h-32"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 text-sm">Mood:</span>
              <select className="bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:border-blue-500 focus:outline-none">
                <option value="Happy">😊 Happy</option>
                <option value="Confused">😕 Confused</option>
                <option value="Excited">🤩 Excited</option>
                <option value="Frustrated">😤 Frustrated</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Save Reflection
            </button>
          </div>
        </div>
      </div>

      {/* Reflections List */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">😊</div>
              <div>
                <p className="text-gray-500 text-sm">2025-07-09</p>
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
          <p className="text-gray-700 leading-relaxed">
            Today I learned about conditional rendering in React. It was a bit
            confusing at first, but now it's clearer!
          </p>
        </div>
      </div>
    </div>
  );
};
