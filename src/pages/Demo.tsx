import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TradingPair } from "@/components/demo/TradingPair";
import { ExecutionLog, LogEntry } from "@/components/demo/ExecutionLog";
import { CycleVisualizer } from "@/components/demo/CycleVisualizer";
import { StatsPanel } from "@/components/demo/StatsPanel";
import { Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";

// Simulated trading pairs
const initialPairs = [
  { symbol: "ETH/USDT", price: 3245.67, change: 1.24 },
  { symbol: "BTC/USDT", price: 98543.21, change: -0.45 },
  { symbol: "ETH/BTC", price: 0.03294, change: 0.89 },
  { symbol: "SOL/USDT", price: 187.45, change: 2.15 },
  { symbol: "SOL/ETH", price: 0.05775, change: 0.32 },
  { symbol: "BNB/USDT", price: 612.30, change: -0.12 },
];

const Demo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [pairs, setPairs] = useState(initialPairs);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activePairs, setActivePairs] = useState<string[]>([]);
  const [legs, setLegs] = useState<{
    from: string;
    to: string;
    side: "BUY" | "SELL";
    status: "pending" | "executing" | "complete" | "failed";
  }[]>([]);
  const [stats, setStats] = useState({
    totalCycles: 0,
    successfulCycles: 0,
    failedCycles: 0,
    totalProfit: 0,
    avgLatency: 0,
    hitRate: 0,
  });

  const addLog = useCallback((message: string, type: LogEntry["type"] = "info", latency?: number) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString("en-US", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit" 
    });
    
    setLogs(prev => [...prev.slice(-50), {
      id: `${Date.now()}-${Math.random()}`,
      timestamp,
      message,
      type,
      latency
    }]);
  }, []);

  // Simulate price updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPairs(prev => prev.map(pair => ({
        ...pair,
        price: pair.price * (1 + (Math.random() - 0.5) * 0.002),
        change: pair.change + (Math.random() - 0.5) * 0.1
      })));
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Simulate trading cycles
  useEffect(() => {
    if (!isRunning) return;

    const runCycle = async () => {
      // Random delay between cycles
      await new Promise(r => setTimeout(r, 2000 + Math.random() * 3000));
      
      if (!isRunning) return;

      // Select random cycle
      const cycles = [
        { pairs: ["ETH/USDT", "ETH/BTC", "BTC/USDT"], tokens: ["USDT", "ETH", "BTC"] },
        { pairs: ["SOL/USDT", "SOL/ETH", "ETH/USDT"], tokens: ["USDT", "SOL", "ETH"] },
      ];
      
      const cycle = cycles[Math.floor(Math.random() * cycles.length)];
      setActivePairs(cycle.pairs);

      addLog(`Scanning ${cycle.pairs.join(" → ")}...`, "info");
      
      // Initialize legs
      setLegs([
        { from: cycle.tokens[0], to: cycle.tokens[1], side: "BUY", status: "pending" },
        { from: cycle.tokens[1], to: cycle.tokens[2], side: "SELL", status: "pending" },
        { from: cycle.tokens[2], to: cycle.tokens[0], side: "SELL", status: "pending" }
      ]);

      await new Promise(r => setTimeout(r, 500));
      addLog("Opportunity detected, validating...", "info");
      
      await new Promise(r => setTimeout(r, 300));
      addLog("Pre-flight checks: PRICE_FILTER ✓ LOT_SIZE ✓ NOTIONAL ✓", "success");

      // Execute legs
      for (let i = 0; i < 3; i++) {
        if (!isRunning) return;
        
        setLegs(prev => prev.map((leg, idx) => 
          idx === i ? { ...leg, status: "executing" } : leg
        ));
        
        const latency = 250 + Math.random() * 100;
        addLog(`Executing leg ${i + 1}...`, "info");
        await new Promise(r => setTimeout(r, latency));
        
        // Random success/fail (90% success rate)
        const success = Math.random() > 0.1;
        
        if (success) {
          setLegs(prev => prev.map((leg, idx) => 
            idx === i ? { ...leg, status: "complete" } : leg
          ));
          addLog(`Leg ${i + 1} complete`, "success", latency);
        } else {
          setLegs(prev => prev.map((leg, idx) => 
            idx === i ? { ...leg, status: "failed" } : leg
          ));
          addLog(`Leg ${i + 1} failed - reverting`, "error", latency);
          
          // Update stats for failure
          setStats(prev => ({
            ...prev,
            totalCycles: prev.totalCycles + 1,
            failedCycles: prev.failedCycles + 1,
            avgLatency: (prev.avgLatency * prev.totalCycles + latency) / (prev.totalCycles + 1),
            hitRate: ((prev.successfulCycles) / (prev.totalCycles + 1)) * 100
          }));
          
          await new Promise(r => setTimeout(r, 1000));
          setActivePairs([]);
          setLegs([]);
          return;
        }
      }

      // Cycle complete
      const profit = (Math.random() - 0.3) * 0.5; // Slight profit bias
      const avgLatency = 280 + Math.random() * 50;
      
      addLog(`Cycle complete: ${profit >= 0 ? "+" : ""}${(profit * 100).toFixed(3)}% (${profit >= 0 ? "HIT" : "MISS"})`, 
        profit >= 0 ? "success" : "warning"
      );

      setStats(prev => ({
        ...prev,
        totalCycles: prev.totalCycles + 1,
        successfulCycles: profit >= 0 ? prev.successfulCycles + 1 : prev.successfulCycles,
        failedCycles: profit < 0 ? prev.failedCycles + 1 : prev.failedCycles,
        totalProfit: prev.totalProfit + profit,
        avgLatency: (prev.avgLatency * prev.totalCycles + avgLatency) / (prev.totalCycles + 1),
        hitRate: ((profit >= 0 ? prev.successfulCycles + 1 : prev.successfulCycles) / (prev.totalCycles + 1)) * 100
      }));

      await new Promise(r => setTimeout(r, 1500));
      setActivePairs([]);
      setLegs([]);
    };

    const cycleLoop = async () => {
      while (isRunning) {
        await runCycle();
      }
    };

    cycleLoop();
  }, [isRunning, addLog]);

  const handleStart = () => {
    setIsRunning(true);
    addLog("Bot started in TESTNET mode", "success");
  };

  const handleStop = () => {
    setIsRunning(false);
    addLog("Bot stopped", "warning");
    setActivePairs([]);
    setLegs([]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setLogs([]);
    setActivePairs([]);
    setLegs([]);
    setPairs(initialPairs);
    setStats({
      totalCycles: 0,
      successfulCycles: 0,
      failedCycles: 0,
      totalProfit: 0,
      avgLatency: 0,
      hitRate: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded bg-warning/10 text-warning text-xs font-mono border border-warning/30">
                  TESTNET
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Arbitrage Bot <span className="gradient-text">Demo</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Simulated triangular arbitrage execution
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isRunning ? (
                <Button variant="hero" onClick={handleStart}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Bot
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleStop}>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Bot
                </Button>
              )}
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="glass-card rounded-xl p-4 mb-6 border-warning/30 bg-warning/5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-warning">Demo Mode:</span> This is a simulation using testnet data. 
                No real trades are executed. Prices and latencies are simulated.
              </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Trading Pairs */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold mb-4">Trading Pairs</h3>
                <div className="space-y-2">
                  {pairs.map((pair) => (
                    <TradingPair
                      key={pair.symbol}
                      symbol={pair.symbol}
                      price={pair.price}
                      change={pair.change}
                      isActive={activePairs.includes(pair.symbol)}
                    />
                  ))}
                </div>
              </div>

              <StatsPanel stats={stats} />
            </div>

            {/* Center Column - Visualization */}
            <div className="space-y-6">
              <CycleVisualizer legs={legs} isRunning={isRunning} />
              
              {/* Balance Display */}
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-semibold mb-4">Simulated Balance</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">USDT</p>
                    <p className="font-mono font-semibold">1,000.00</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">ETH</p>
                    <p className="font-mono font-semibold">0.3000</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">BTC</p>
                    <p className="font-mono font-semibold">0.0100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Execution Log */}
            <div>
              <ExecutionLog logs={logs} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
