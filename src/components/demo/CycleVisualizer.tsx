import { cn } from "@/lib/utils";

interface CycleVisualizerProps {
  legs: {
    from: string;
    to: string;
    side: "BUY" | "SELL";
    status: "pending" | "executing" | "complete" | "failed";
  }[];
  isRunning: boolean;
}

export const CycleVisualizer = ({ legs, isRunning }: CycleVisualizerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "text-success border-success bg-success/10";
      case "executing": return "text-primary border-primary bg-primary/10 animate-pulse";
      case "failed": return "text-destructive border-destructive bg-destructive/10";
      default: return "text-muted-foreground border-border bg-secondary/50";
    }
  };

  const tokens = legs.length > 0 
    ? [legs[0].from, legs[0].to, legs[1].to]
    : ["USDT", "ETH", "BTC"];

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Cycle Visualization</h3>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono",
          isRunning 
            ? "bg-primary/10 text-primary border border-primary/30" 
            : "bg-secondary text-muted-foreground"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            isRunning ? "bg-primary pulse-dot" : "bg-muted-foreground"
          )} />
          {isRunning ? "EXECUTING" : "IDLE"}
        </div>
      </div>

      {/* Triangle Visualization */}
      <div className="relative aspect-[4/3] max-w-sm mx-auto">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Connections */}
          <line 
            x1="200" y1="60" 
            x2="340" y2="240" 
            stroke={legs[0]?.status === "complete" ? "hsl(var(--success))" : "hsl(var(--border))"}
            strokeWidth="2"
            strokeDasharray={legs[0]?.status === "executing" ? "5,5" : "none"}
          />
          <line 
            x1="340" y1="240" 
            x2="60" y2="240" 
            stroke={legs[1]?.status === "complete" ? "hsl(var(--success))" : "hsl(var(--border))"}
            strokeWidth="2"
            strokeDasharray={legs[1]?.status === "executing" ? "5,5" : "none"}
          />
          <line 
            x1="60" y1="240" 
            x2="200" y2="60" 
            stroke={legs[2]?.status === "complete" ? "hsl(var(--success))" : "hsl(var(--border))"}
            strokeWidth="2"
            strokeDasharray={legs[2]?.status === "executing" ? "5,5" : "none"}
          />

          {/* Nodes */}
          {[
            { x: 200, y: 60, token: tokens[0], leg: 0 },
            { x: 340, y: 240, token: tokens[1], leg: 1 },
            { x: 60, y: 240, token: tokens[2], leg: 2 }
          ].map((node, i) => (
            <g key={i}>
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="30" 
                fill="hsl(var(--card))" 
                stroke={
                  legs[node.leg]?.status === "complete" ? "hsl(var(--success))" :
                  legs[node.leg]?.status === "executing" ? "hsl(var(--primary))" :
                  "hsl(var(--border))"
                }
                strokeWidth="2"
              />
              <text 
                x={node.x} 
                y={node.y + 4} 
                textAnchor="middle" 
                fill="hsl(var(--foreground))" 
                fontSize="12" 
                fontFamily="monospace"
              >
                {node.token}
              </text>
            </g>
          ))}

          {/* Side Labels */}
          {legs.length > 0 && (
            <>
              <text x="280" y="140" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">
                {legs[0]?.side}
              </text>
              <text x="200" y="270" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">
                {legs[1]?.side}
              </text>
              <text x="110" y="140" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="monospace">
                {legs[2]?.side}
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Leg Status */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {legs.map((leg, i) => (
          <div 
            key={i}
            className={cn(
              "text-center p-2 rounded-lg border text-xs font-mono",
              getStatusColor(leg.status)
            )}
          >
            <p className="font-medium">Leg {i + 1}</p>
            <p className="text-[10px] opacity-70">{leg.from}→{leg.to}</p>
          </div>
        ))}
        {legs.length === 0 && (
          <>
            <div className="text-center p-2 rounded-lg border border-border bg-secondary/50 text-xs font-mono text-muted-foreground">
              <p>Leg 1</p>
            </div>
            <div className="text-center p-2 rounded-lg border border-border bg-secondary/50 text-xs font-mono text-muted-foreground">
              <p>Leg 2</p>
            </div>
            <div className="text-center p-2 rounded-lg border border-border bg-secondary/50 text-xs font-mono text-muted-foreground">
              <p>Leg 3</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
