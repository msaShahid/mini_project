import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      {...props}
      className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);

export default Input;
