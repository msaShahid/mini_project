import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <section className="bg-gradient-to-r from-blue-300 to-indigo-400 min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        <div className="md:w-1/3 bg-blue-600 flex items-center justify-center p-8">
          <div className="w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center text-4xl font-bold text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name || "User"}!
          </h2>
          <p className="text-gray-700 mb-6">
            This is your profile page. You can manage your account details here and stay updated with your activity.
          </p>

          <div className="bg-gray-100 rounded-xl p-4 mb-6 shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Information</h3>
            <p className="text-gray-600"><strong>Email:</strong> {user?.email || "Not Provided"}</p>
            <p className="text-gray-600"><strong>Username:</strong> {user?.name || "Not Provided"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="self-start bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>

      </div>
    </section>
  );
};

export default Profile;
