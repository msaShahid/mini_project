import React from "react";

interface TdProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const Td: React.FC<TdProps> = ({
  children,
  align = "left",
  className = "",
}) => {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <td className={`px-6 py-4 ${alignClass} ${className}`}>
      {children}
    </td>
  );
};

export default Td;
