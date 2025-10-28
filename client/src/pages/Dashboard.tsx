import React from "react";

const Dashboard: React.FC = () => {
  const handleAddTask = () => {
    console.log("Add Task clicked");
  };

  const tasks = [
    { id: 1, title: "Finish React project", status: "In Progress" },
    { id: 2, title: "Read documentation", status: "Completed" },
    { id: 3, title: "Plan daily tasks", status: "Pending" },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Total Tasks</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Completed</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {tasks.filter(t => t.status === "Completed").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Pending</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">
              {tasks.filter(t => t.status !== "Completed").length}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
