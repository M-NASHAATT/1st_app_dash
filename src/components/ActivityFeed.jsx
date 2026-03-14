export default function ActivityFeed() {
  return (
    <div className="card p-6 rounded-xl bg-white dark:bg-[#151c2c] border border-primary/10 shadow-sm overflow-y-auto custom-scrollbar max-h-[320px]">
      <h3 className="mb-4 font-semibold">Recent Activity</h3>
      <div className="space-y-4">
        {/* You can make these dynamic later! */}
        <div className="activity-item critical border-l-4 border-red-500 pl-3">
          <p>High pollution detected</p>
          <span className="text-xs text-slate-500">2 mins ago</span>
        </div>
        
        <div className="activity-item info border-l-4 border-blue-500 pl-3">
          <p>New user registered</p>
          <span className="text-xs text-slate-500">10 mins ago</span>
        </div>

         <div className="activity-item system border-l-4 border-green-500 pl-3">
            <p>AI module updated</p>
            <span className="text-xs text-slate-500">1 hour ago</span>
        </div>
      </div>
    </div>
  );
}