import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  latency?: number;
}

interface ExecutionLogProps {
  logs: LogEntry[];
}

export const ExecutionLog = ({ logs }: ExecutionLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden h-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
        <div className="w-2 h-2 rounded-full bg-success pulse-dot" />
        <span className="text-xs text-muted-foreground font-mono">execution.log</span>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 font-mono text-xs h-[300px] overflow-y-auto space-y-1 bg-background/50"
      >
        {logs.length === 0 ? (
          <p className="text-muted-foreground">Waiting for execution...</p>
        ) : (
          logs.map((log) => (
            <p key={log.id} className={cn(getTypeColor(log.type))}>
              <span className="text-primary">[{log.timestamp}]</span>
              {log.latency !== undefined && (
                <span className="text-muted-foreground"> [{log.latency.toFixed(2)}ms]</span>
              )}
              {" "}{log.message}
            </p>
          ))
        )}
      </div>
    </div>
  );
};
