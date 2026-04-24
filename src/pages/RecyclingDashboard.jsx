export default function RecyclingDashboard() {
  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-300">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2 mt-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Recycling Overview</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time telemetry for global procurement and batch operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2d3a54] text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#1a2235] transition-colors duration-200">
            Invite User
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> Add New Batch
          </button>
        </div>
      </div>

      {/* --- BENTO GRID LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* KPI 1: Total Batches */}
        <div className="md:col-span-3 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary text-[20px]">layers</span>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Batches</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">1,482</div>
          <div className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1">
            <span className="text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 12%</span>
            <span>vs last cycle</span>
          </div>
        </div>

        {/* KPI 2: Active Orders */}
        <div className="md:col-span-3 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-amber-500 text-[20px]">local_shipping</span>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Orders</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">347</div>
          <div className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1">
            <span className="text-red-500 flex items-center bg-red-500/10 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">arrow_downward</span> 2.4%</span>
            <span>vs last cycle</span>
          </div>
        </div>

        {/* KPI 3: Total Users */}
        <div className="md:col-span-3 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-blue-500 text-[20px]">group</span>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Users</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-white">8,920</div>
          <div className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1">
            <span className="text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 4.1%</span>
            <span>vs last cycle</span>
          </div>
        </div>

        {/* KPI 4: Impact */}
        <div className="md:col-span-3 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <span className="material-symbols-outlined text-emerald-500 text-[20px]">public</span>
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Impact (Tons)</h3>
          </div>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-cyan-400 relative z-10">
            45.2k
          </div>
          <div className="mt-2 text-xs font-bold text-slate-500 flex items-center gap-1 relative z-10">
            <span className="text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 18%</span>
            <span>vs last cycle</span>
          </div>
        </div>

        {/* --- INVENTORY SNAPSHOT TABLE --- */}
        <div className="md:col-span-8 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl overflow-hidden flex flex-col shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-[#2d3a54] flex items-center justify-between bg-slate-50 dark:bg-[#101622]/50">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Snapshot</h3>
            <button className="text-primary text-sm font-bold hover:underline transition-colors">View All</button>
          </div>
          
          <div className="flex-1 p-4">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-3">Batch ID</div>
              <div className="col-span-4">Material Type</div>
              <div className="col-span-2 text-right">Volume</div>
              <div className="col-span-3 text-right">Status</div>
            </div>
            
            <div className="space-y-2">
              {[
                { id: 'BTH-8921', type: 'Industrial Polymer Class IV', vol: '1,240 kg', status: 'Processed', color: 'emerald' },
                { id: 'BTH-8920', type: 'Raw Silica Composite', vol: '850 kg', status: 'Pending QA', color: 'amber' },
                { id: 'BTH-8919', type: 'Synthesized Alloy Base', vol: '3,100 kg', status: 'Rejected', color: 'rose' },
                { id: 'BTH-8918', type: 'Lithium Extract Grade A', vol: '450 kg', status: 'Processed', color: 'emerald' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 dark:bg-[#101622]/50 hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors rounded-xl items-center text-sm cursor-pointer group border border-transparent hover:border-slate-200 dark:hover:border-[#2d3a54]">
                  <div className="col-span-3 font-bold text-slate-900 dark:text-white font-mono">{row.id}</div>
                  <div className="col-span-4 text-slate-600 dark:text-slate-400 font-medium">{row.type}</div>
                  <div className="col-span-2 text-right text-slate-900 dark:text-white font-bold">{row.vol}</div>
                  <div className="col-span-3 flex justify-end">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${row.color}-500/10 text-${row.color}-500 border border-${row.color}-500/20`}>
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SYSTEM ACTIVITY CHART (CSS Bars) --- */}
        <div className="md:col-span-4 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Activity</h3>
            <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-primary">more_vert</span>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-3 pt-10 relative z-10 h-40">
            {[30, 50, 20, 70, 90, 60, 40].map((height, i) => (
              <div key={i} className="w-full relative group h-full flex items-end">
                <div 
                  className={`w-full rounded-t-md transition-all duration-300 ${i === 4 ? 'bg-primary' : 'bg-slate-200 dark:bg-[#2d3a54] group-hover:bg-primary/50'}`} 
                  style={{ height: `${height}%` }}
                >
                  {i === 4 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(19,91,236,0.8)]"></div>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest relative z-10">
            <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 blur-3xl rounded-full"></div>
        </div>

        {/* --- RECENT PURCHASE ORDERS --- */}
        <div className="md:col-span-12 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Purchase Orders</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2d3a54] flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#101622] text-slate-500 transition-colors"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2d3a54] flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#101622] text-slate-500 transition-colors"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'PO-2023-089', name: 'NexTech Heavy Industries', status: 'Fulfilling', color: 'emerald', value: '$1.24M' },
              { id: 'PO-2023-088', name: 'Quantum Logistics Group', status: 'Awaiting Approval', color: 'amber', value: '$850K' },
              { id: 'PO-2023-087', name: 'AeroSpace Dynamics', status: 'Completed', color: 'emerald', value: '$3.4M' }
            ].map((po, i) => (
              <div key={i} className="bg-slate-50 dark:bg-[#101622]/50 p-5 rounded-xl border border-slate-200 dark:border-[#2d3a54] hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 mb-1 block font-mono">{po.id}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{po.name}</h4>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded bg-${po.color}-500/10 text-${po.color}-500 text-[10px] font-bold uppercase tracking-wider border border-${po.color}-500/20`}>
                    {po.status}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-6 pt-4 border-t border-slate-200 dark:border-[#2d3a54]">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Total Value</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white">{po.value}</span>
                  </div>
                  <button className="text-xs font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1">
                    Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}