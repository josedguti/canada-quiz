interface BadgeProps {
  variant: "pass" | "fail" | "neutral";
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const variants = {
    pass: "bg-emerald-100 text-emerald-800",
    fail: "bg-red-100 text-red-800",
    neutral: "bg-zinc-100 text-zinc-700",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
