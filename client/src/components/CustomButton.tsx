import Link from "next/link";

type CustomButtonProps = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
};

const CustomButton = ({
  label,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
}: CustomButtonProps) => {
  // B/W/G color variants
  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
    outline:
      "bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2",
  };

  // Size classes with sufficient padding for HCI compliance
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={ariaLabel ?? label}
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  );
};

export default CustomButton;
