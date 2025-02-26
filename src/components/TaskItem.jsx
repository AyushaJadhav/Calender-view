import { useState } from "react";
import { CheckCircle, Square as SquareIcon } from "lucide-react";

const Task = ({ taskData, onToggleComplete }) => {
  const [isCompleted, setIsCompleted] = useState(taskData.completed);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
    onToggleComplete(taskData.id); // Update parent state
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow border">
      <div className="flex items-center gap-2">
        <button onClick={toggleCompletion} className="focus:outline-none">
          {isCompleted ? (
            <CheckCircle className="text-blue-500 w-5 h-5" />
          ) : (
            <SquareIcon className="text-gray-400 w-5 h-5" />
          )}
        </button>
        <span className={`text-gray-700 font-medium ${isCompleted ? "line-through text-gray-400" : ""}`}>
          {taskData.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <span className={`px-2 py-1 text-xs rounded ${
          taskData.status === "Completed" ? "bg-green-200 text-green-700" :
          taskData.status === "In Progress" ? "bg-blue-200 text-blue-700" :
          "bg-gray-200 text-gray-700"
        }`}>
          {taskData.status}
        </span>

        {/* Assignee Avatar */}
        <span className="text-gray-700 text-sm">{taskData.assignee}</span>

        {/* Category Tag */}
        <span className={`px-2 py-1 text-xs rounded ${
          taskData.category === "Research" ? "bg-pink-200 text-pink-700" :
          "bg-yellow-200 text-yellow-700"
        }`}>
          {taskData.category}
        </span>
      </div>
    </div>
  );
};

export default Task;
