import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TradingPairProps {
  symbol: string;
  price: number;
  change: number;
  isActive?: boolean;
}

export const TradingPair = ({ symbol, price, change, isActive }: TradingPairProps) => {
  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-all",
        isActive 
          ? "bg-primary/10 border border-primary/30" 
          : "bg-secondary/50 hover:bg-secondary"
      )}
    >
      <div>
        <span className="font-mono font-medium">{symbol}</span>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm">{price.toFixed(symbol.includes("BTC") ? 8 : 4)}</p>
        <p className={cn(
          "text-xs flex items-center justify-end gap-1",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
