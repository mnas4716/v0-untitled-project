import Link from "next/link"

interface LogoProps {
  variant?: "default" | "white"
  size?: "sm" | "md" | "lg"
  iconOnly?: boolean
}

export function Logo({ variant = "default", size = "md", iconOnly = false }: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-blue-600"
  const iconColor = variant === "white" ? "#ffffff" : "#2563eb"

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative">
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" fill={iconColor} fillOpacity="0.1" />
          <path d="M12 7V17" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 12H17" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="9" stroke={iconColor} strokeWidth="1.5" />
        </svg>
      </div>
      {!iconOnly && <span className={`font-bold ${sizeClasses[size]} ${textColor}`}>freedoc</span>}
    </Link>
  )
}
