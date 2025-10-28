import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const Home: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
          Organize Your Life <span className="text-blue-600">Effortlessly</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700 sm:text-xl">
          Manage your tasks, increase productivity, and stay on top of your daily goals.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to={ROUTES.AUTH.LOGIN}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            Get Started
          </Link>
          <button
            onClick={() => console.log("Learn More clicked")}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-lg shadow transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Task Management</h3>
          <p className="text-gray-600">Add, edit, and delete tasks quickly with a user-friendly interface.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress</h3>
          <p className="text-gray-600">Visualize your daily, weekly, and monthly task completion.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Stay Notified</h3>
          <p className="text-gray-600">Get reminders for upcoming tasks and never miss deadlines.</p>
        </div>
      </section>


      <section className="bg-blue-600 py-20 mt-10 text-center text-white rounded-t-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold">Ready to Boost Your Productivity?</h2>
        <p className="mt-4 text-lg sm:text-xl">Start managing your tasks efficiently today.</p>
        <Link
          to={ROUTES.AUTH.REGISTER}
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
