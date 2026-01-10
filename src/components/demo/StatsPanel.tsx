import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity, Clock, Target, Zap } from "lucide-react";

interface StatsPanelProps {
  stats: {
    totalCycles: number;
    successfulCycles: number;
    failedCycles: number;
    totalProfit: number;
    avgLatency: number;
    hitRate: number;
  };
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  const statItems = [
    {
      label: "Total Cycles",
      value: stats.totalCycles,
      icon: Activity,
      color: "primary"
    },
    {
      label: "Successful",
      value: stats.successfulCycles,
      icon: TrendingUp,
      color: "success"
    },
    {
      label: "Failed",
      value: stats.failedCycles,
      icon: TrendingDown,
      color: "destructive"
    },
    {
      label: "Est. Profit",
      value: `$${stats.totalProfit.toFixed(2)}`,
      icon: Target,
      color: stats.totalProfit >= 0 ? "success" : "destructive"
    },
    {
      label: "Avg Latency",
      value: `${stats.avgLatency.toFixed(0)}ms`,
      icon: Clock,
      color: "warning"
    },
    {
      label: "Hit Rate",
      value: `${stats.hitRate.toFixed(1)}%`,
      icon: Zap,
      color: "primary"
    }
  ];

  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="font-semibold mb-4">Session Stats</h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((stat) => (
          <div key={stat.label} className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={cn("w-4 h-4", `text-${stat.color}`)} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className={cn("font-mono font-semibold", `text-${stat.color}`)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
