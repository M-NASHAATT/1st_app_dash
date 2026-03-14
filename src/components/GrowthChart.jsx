import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function GrowthChart() {
  // 1. THE DATA (This would come from your Backend API later!)
  const data = [
    { month: 'Jan', users: 4000 },
    { month: 'Feb', users: 3000 },
    { month: 'Mar', users: 5000 },
    { month: 'Apr', users: 8780 },
    { month: 'May', users: 14890 },
    { month: 'Jun', users: 23900 },
    { month: 'Jul', users: 24852 }, // Current Month
  ];

  // 2. CUSTOM TOOLTIP (The box that pops up when you hover)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#1a2333] border border-slate-200 dark:border-[#232f48] p-3 rounded-lg shadow-xl">
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{label}</p>
          <p className="text-xs font-medium text-primary">
            {payload[0].value.toLocaleString()} Active Users
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="xl:col-span-2 bg-white dark:bg-[#151c2c] border border-primary/10 rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
      
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">User Growth</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly active users across the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">trending_up</span> +24%
          </span>
        </div>
      </div>

      {/* 3. THE RECHARTS COMPONENT */}
      <div className="flex-1 w-full min-h-0">
        {/* ResponsiveContainer makes the chart stretch to fit its box automatically */}
        <ResponsiveContainer width="100%" height="100%">
          
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            
            {/* The background grid lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d3a54" opacity={0.3} />
            
            {/* X and Y Axes (Hidden lines, just text) */}
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
            
            {/* Our custom hover box */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#135bec', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* The gradient color definition */}
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#135bec" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {/* The actual colored line/area */}
            <Area 
              type="monotone" 
              dataKey="users" 
              stroke="#135bec" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorUsers)" 
            />

          </AreaChart>

        </ResponsiveContainer>
      </div>
      
    </div>
  );
}