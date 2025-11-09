import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { usersApi } from "../../api/usersApi";

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const Register: React.FC = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>();

  const password = watch("password");

  const onSubmit = async (data: RegisterInputs) => {
    try {
      await usersApi.userRegister(data);
      toast.success("Account created successfully!");
      navigate(ROUTES.AUTH.LOGIN, { replace: true });
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Already have one?{" "}
          <a href={ROUTES.AUTH.LOGIN} className="text-blue-600 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            placeholder="Jane Doe"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            {...register("name", { required: "Full name is required" })}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

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
          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter password"
              className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              {...register("confirm", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>}
        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Creating account...</span>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
