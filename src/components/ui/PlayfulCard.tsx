import React from 'react';
import { cn } from '@/lib/utils';
interface PlayfulCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export function PlayfulCard({ children, className, ...props }: PlayfulCardProps) {
  return (
    <div 
      className={cn(
        "playful-card p-6 md:p-8",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}