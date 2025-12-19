import React from "react";

interface ThProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const Th: React.FC<ThProps> = ({children,align = "left",className = "",}) => {
  const alignClass = align === "center" ? "text-center": align === "right" ? "text-right" : "text-left";

  return (
    <th
      className={`px-6 py-3 ${alignClass} text-sm font-semibold text-gray-700 ${className}`}
    >
      {children}
    </th>
  );
};

export default Th;
