import { useState } from "react";
import SprintSection from "./SprintSection";
import tasks from "../data/tasks";
import { Search } from "lucide-react";

const TaskBoard = () => {
  const [groupBy, setGroupBy] = useState("Sprint");
  const groupingOptions = ["Sprint", "Priority", "Status", "Assignee", "Category"];

  const toggleGroupBy = () => {
    const currentIndex = groupingOptions.indexOf(groupBy);
    const nextIndex = (currentIndex + 1) % groupingOptions.length;
    setGroupBy(groupingOptions[nextIndex]);
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">List View Board</h1>
      
      {/* Top Search & Button Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 p-2 border rounded-lg bg-gray-100 focus:ring focus:ring-blue-300" 
          />
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition" 
          onClick={toggleGroupBy}
        >
          Group by: {groupBy}
        </button>
      </div>

      {/* Sprint Sections */}
      <div className="space-y-6">
        {tasks.map((sprint, index) => (
          <SprintSection key={index} sprintData={sprint} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
