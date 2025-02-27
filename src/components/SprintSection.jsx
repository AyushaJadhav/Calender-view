import { useState, useEffect } from "react";
import Task from "./TaskItem";
import { ChevronDown } from "lucide-react";

const SprintSection = ({ sprintData }) => {
  const [tasks, setTasks] = useState([...sprintData.tasks]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    status: "To Do",
    assignee: "",
    category: "",
  });

  useEffect(() => {
    setTasks([...sprintData.tasks]); // Ensure tasks update when sprintData changes
  }, [sprintData]);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // ✅ FIXED: Add new task to the local state instead of sprintData.tasks
  const handleSubmit = () => {
    if (newTask.name.trim()) {
      const newTaskData = { id: Date.now(), ...newTask, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTaskData]); // Update tasks state
      setIsModalOpen(false);
      setNewTask({ name: "", status: "To Do", assignee: "", category: "" });
    }
  };

  // ✅ Delete Task Function (Already Fixed)
  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-4 rounded-lg shadow-md border">
      {/* Sprint Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-5 h-5 text-gray-600" />
          <h2 className="font-semibold text-lg">{sprintData.title}</h2>
          <div>{tasks.length} Tasks</div>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.id} taskData={task} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No tasks available</p>
        )}
      </div>

      {/* Add Task Button */}
      <button onClick={handleCreateClick} className="text-blue-500 text-sm mt-2">
        + Create
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Modal Box */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80 z-50">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

            {/* Task Name */}
            <input
              type="text"
              name="name"
              placeholder="Summary"
              value={newTask.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />

            {/* Status Dropdown */}
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Assignee Dropdown */}
            <select
              name="assignee"
              value={newTask.assignee}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Assignee</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Maya Johnson">Maya Johnson</option>
            </select>

            {/* Category Input */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newTask.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Modal Buttons */}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintSection;
