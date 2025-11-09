import { useEffect } from "react";
import { useForm } from "react-hook-form";
//import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { LogIn } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../store/redux/authSlice';
import { RootState, AppDispatch } from "../../store/redux/store";

type LoginInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  
  // Context API version 
  // const { login, user } = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>();

  useEffect(() => {
    if (user) navigate(ROUTES.DASHBOARD, { replace: true });
  }, [user, navigate]);

  // const onSubmit = async (data: LoginInputs) => {
  //   try {
  //     await login(data.email, data.password);
  //     toast.success("Welcome back!");
  //     const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
  //     navigate(from, { replace: true });
  //   } catch (error) {
  //     toast.error("Invalid credentials");
  //     console.log(error);
  //   }
  // };

    const onSubmit = async (data: LoginInputs) => {
      try {
        const resultAction = await dispatch(loginUser(data));

        // Redux Toolkit createAsyncThunk returns action with meta info
        if (loginUser.fulfilled.match(resultAction)) {
          toast.success(`Welcome back, ${resultAction.payload.name}!`);
          const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
          navigate(from, { replace: true });
        } else {
          toast.error(resultAction.payload || "Invalid credentials");
        }
      } catch (err) {
        toast.error("Login failed. Please try again.");
        console.error(err);
      }
    };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          or{" "}
          <a
            href={ROUTES.AUTH.REGISTER}
            className="text-blue-600 hover:underline font-medium"
          >
            create a new account
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            {...register("email", { required: "Email is required" })}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            {...register("password", { required: "Password is required" })}
            disabled={isSubmitting}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Logging in...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
