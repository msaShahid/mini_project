
import { Outlet, Link } from 'react-router-dom';
import ROUTES from '../routes/ROUTES'

const AuthLayout : React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <Link to={ROUTES.HOME} className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">ReactApp</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <Outlet />
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            to={ROUTES.HOME} 
            className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default AuthLayout;