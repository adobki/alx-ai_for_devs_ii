import * as React from "react";

export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className ?? ""}`}>{children}</div>;
}

export function CardHeader({ children }: React.PropsWithChildren) {
  return <div className="p-6 pb-0 font-semibold text-lg">{children}</div>;
}

export function CardTitle({ children }: React.PropsWithChildren) {
  return <h2 className="text-xl font-bold mb-2">{children}</h2>;
}

export function CardContent({ children }: React.PropsWithChildren) {
  return <div className="p-6 pt-0">{children}</div>;
}
