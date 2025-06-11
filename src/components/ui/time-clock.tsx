"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimeClockProps {
  className?: string;
}

export function TimeClock({ className }: TimeClockProps) {
  const [mounted, setMounted] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className={cn(
      "fixed top-4 left-4 z-50 font-mono text-lg time-clock",
      className
    )}>
      {hours}:{minutes}:{seconds}
    </div>
  );
} 