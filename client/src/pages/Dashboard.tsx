import React, { useEffect, useState } from "react";
import { taskService } from "../services/taskService";
import { Task } from "../types/Task";


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    console.log("Add Task clicked");
    
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAll();
     // console.log("Fetched tasks:", response);
      setTasks(response);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedCount = tasks.filter((t) => t.status === "Done").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">
              Here’s an overview of your tasks for today
            </p>
          </div>
          <button
            onClick={handleAddTask}
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition-all duration-200"
          >
            + Add Task
          </button>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Completed</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">{completedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">{pendingCount}</p>
          </div>
        </div>

        {/* Error & Loading */}
        {loading && <p className="text-gray-500">Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h4
                className={`font-medium text-gray-800 ${
                  task.status === "Done" ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </h4>
              <p
                className={`mt-1 text-sm ${
                  task.status === "Done" ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {task.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
