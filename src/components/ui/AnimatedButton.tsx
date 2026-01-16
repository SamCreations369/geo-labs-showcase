import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export function AnimatedButton({ 
  href, 
  children, 
  className,
  variant = "primary" 
}: AnimatedButtonProps) {
  const baseStyles = variant === "primary" 
    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
    : "bg-transparent text-foreground hover:bg-secondary";

  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-200 overflow-hidden active:scale-[0.98]",
        baseStyles,
        className
      )}
    >
      <span className="relative inline-flex overflow-hidden h-[1.5em]">
        <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span 
          className="absolute top-full transition-transform duration-300 ease-out group-hover:-translate-y-full" 
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </a>
  );
}
