import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
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
        <span className={cn(
          "transition-transform duration-300 ease-out group-hover:-translate-y-full",
          isMobile && "animate-text-slide"
        )}>
          {children}
        </span>
        <span 
          className={cn(
            "absolute top-full transition-transform duration-300 ease-out group-hover:-translate-y-full",
            isMobile && "animate-text-slide"
          )}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    </a>
  );
}
