import { useState } from 'react';

export default function ActivityLogs() {
  // State to control the slide-out Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-background-light dark:bg-[#0c111a] w-full">
      
      {/* ========================================= */}
      {/* 1. SIDEBAR FILTERS (Specific to this page) */}
      {/* ========================================= */}
      <aside className="w-64 border-r border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#111722] flex-shrink-0 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Event Level</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Critical</span>
                <span className="ml-auto text-[10px] bg-red-500/20 text-red-500 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">12</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Warning</span>
                <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold">45</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Info</span>
                <span className="ml-auto text-[10px] bg-blue-500/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold">1.2k</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Debug</span>
                <span className="ml-auto text-[10px] bg-slate-200 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-bold">8.4k</span>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Category</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <span className="material-symbols-outlined text-lg opacity-60">memory</span> System
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <span className="material-symbols-outlined text-lg opacity-60">psychology</span> AI Decision
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <span className="material-symbols-outlined text-lg opacity-60">person</span> User Behavior
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox"/>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                  <span className="material-symbols-outlined text-lg opacity-60">featured_seasonal_and_gifts</span> Rewards
                </div>
              </label>
            </div>
          </div>

          <div>
            <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list_off</span> Reset Filters
            </button>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-200 dark:border-[#232f48]">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-[10px] font-bold text-primary uppercase mb-2">System Status</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Database</span>
              <span className="text-xs font-bold text-green-500">Stable</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">AI Engine</span>
              <span className="text-xs font-bold text-green-500">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Network</span>
              <span className="text-xs font-bold text-green-500">99.9%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================= */}
      {/* 2. MAIN CONTENT AREA                      */}
      {/* ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        
        {/* Page Header Controls */}
        <div className="p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Activity Logs</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Auditing system events and administrative actions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input 
                className="w-72 pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#111722] border border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-slate-900 dark:text-white outline-none placeholder-slate-500" 
                placeholder="Search by actor or action..." 
                type="text"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111722] border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <span className="material-symbols-outlined text-lg">calendar_today</span> Oct 01 - Oct 31 <span className="material-symbols-outlined text-lg">expand_more</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-sm font-bold text-white transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-lg">download</span> Export CSV
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pb-6">
          <div className="p-4 bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#232f48] rounded-xl flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined text-2xl">event_list</span></div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Events Today</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">12,402</h4>
                <span className="text-[10px] font-bold text-green-500">+12%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#232f48] rounded-xl flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500"><span className="material-symbols-outlined text-2xl">error</span></div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Critical Errors</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">3</h4>
                <span className="text-[10px] font-bold text-red-500">+1</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#232f48] rounded-xl flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-2xl">auto_awesome</span></div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Decisions</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">850</h4>
                <span className="text-[10px] font-bold text-green-500">+18%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#232f48] rounded-xl flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500"><span className="material-symbols-outlined text-2xl">admin_panel_settings</span></div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Admins</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">5</h4>
                <span className="text-[10px] font-bold text-slate-500">Steady</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <div className="h-full bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#232f48] rounded-xl flex flex-col overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                
                <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-[#1a2333]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48]">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48]">Level</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48]">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48]">Actor</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48]">Action</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-[#232f48] text-right">Details</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100 dark:divide-[#232f48]">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">2023-10-24</span><span className="text-xs text-slate-500 font-mono">14:22:15.842</span></div></td>
                    <td className="px-6 py-3 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30">CRITICAL</span></td>
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-base opacity-40">shield_lock</span>Security</div></td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img className="size-7 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN-ZKzuYpZqgQE5eJyY35Bp_GC6ZKIPtxcNpVotLgFffOtOxSvevGpRo8lYxNmMrSftvjGjH1osTeHZwYnGJR4-RBREo6oLUjwf1wJNrgwZwBOrpDdStptgP907fx9RTk1t0X-e0-eqjkQc-gFOyu_H8xF4VdBSw-vAtqLeR9PWeX2uyooJ8t4V2FcBECa0ElZaj39Lm2-M59FnAAS94tQATVvEBdponFsdh35SrX2Nq2JsQyuXLk5HpVraMzaN1NZLZ1hERP-1w"/>
                        <div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">Admin_David</span><span className="text-[10px] text-slate-500 uppercase">Superadmin</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><p className="text-sm text-slate-600 dark:text-slate-300">Unauthorized login attempt detected from IP <span className="text-primary underline decoration-primary/30">192.168.1.105</span>. Account temporarily locked.</p></td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setIsDrawerOpen(true)} className="text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded bg-primary/10 border border-primary/20 hover:bg-primary">View Details</button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">2023-10-24</span><span className="text-xs text-slate-500 font-mono">14:18:03.112</span></div></td>
                    <td className="px-6 py-3 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary border border-primary/30">INFO</span></td>
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-base opacity-40">psychology</span>AI Operation</div></td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-7 rounded-full bg-primary/10 dark:bg-primary/30 border border-primary/30 dark:border-primary/50 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-base">robot_2</span></div>
                        <div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">Sentinel_v4.2</span><span className="text-[10px] text-slate-500 uppercase">AI Process</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><p className="text-sm text-slate-600 dark:text-slate-300">AI Verified Reward Claim <span className="text-slate-500 font-mono">#RE-9921</span> with 99.4% confidence score.</p></td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setIsDrawerOpen(true)} className="text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded bg-primary/10 border border-primary/20 hover:bg-primary">View Details</button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">2023-10-24</span><span className="text-xs text-slate-500 font-mono">14:05:44.221</span></div></td>
                    <td className="px-6 py-3 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">WARNING</span></td>
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-base opacity-40">memory</span>System</div></td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400"><span className="material-symbols-outlined text-base">settings</span></div>
                        <div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">System_Cron</span><span className="text-[10px] text-slate-500 uppercase">Process</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><p className="text-sm text-slate-600 dark:text-slate-300">Storage usage reached 85% on node <span className="text-slate-500 dark:text-slate-400 font-mono">EU-WEST-1A</span>. Optimization suggested.</p></td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setIsDrawerOpen(true)} className="text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded bg-primary/10 border border-primary/20 hover:bg-primary">View Details</button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">2023-10-24</span><span className="text-xs text-slate-500 font-mono">13:59:12.901</span></div></td>
                    <td className="px-6 py-3 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">INFO</span></td>
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-base opacity-40">person</span>User Behavior</div></td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img className="size-7 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn9mjjHsqNAkjPwWjpJi6Kh497t9hsRGKv66RKFc6HWYZUvQkqEiPHp-iViyjkAHRw9vbH6jMyNlOE_U1qtXlJBXvzImEdYmBi7t2fZvjXTjnaS4f1cf3o3R3FxY6cCrFCl2u4Czlhyj3QN1oMgxokzHTxPI4LA5f94Gql9Bet9veN7IurA_hRit4FigK_ThxCr7ycCs-AnoVfC9YhyBt91yw0sjZRYytV92Y8Yv7T9PaxJ8-5RiaCUUmo8H2im7uwuiAuL3cDCQ"/>
                        <div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">Mod_Sarah</span><span className="text-[10px] text-slate-500 uppercase">Moderator</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><p className="text-sm text-slate-600 dark:text-slate-300">User <span className="text-slate-900 dark:text-white font-medium">@toxic_hunter_99</span> suspended for persistent TOS violations (Category: Harassment).</p></td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setIsDrawerOpen(true)} className="text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded bg-primary/10 border border-primary/20 hover:bg-primary">View Details</button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">2023-10-24</span><span className="text-xs text-slate-500 font-mono">13:50:00.000</span></div></td>
                    <td className="px-6 py-3 whitespace-nowrap"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30">SUCCESS</span></td>
                    <td className="px-6 py-3 whitespace-nowrap"><div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-base opacity-40">database</span>System</div></td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400"><span className="material-symbols-outlined text-base">cloud_done</span></div>
                        <div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-slate-200">Cloud_Backup</span><span className="text-[10px] text-slate-500 uppercase">System</span></div>
                      </div>
                    </td>
                    <td className="px-6 py-3"><p className="text-sm text-slate-600 dark:text-slate-300">Daily system backup completed successfully. Total data archived: <span className="text-slate-900 dark:text-white font-medium">4.2 TB</span>.</p></td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => setIsDrawerOpen(true)} className="text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded bg-primary/10 border border-primary/20 hover:bg-primary">View Details</button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-slate-50 dark:bg-[#1a2333] px-6 py-4 flex flex-wrap items-center justify-between border-t border-slate-200 dark:border-[#232f48] gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="text-slate-900 dark:text-white font-bold">1-5</span> of <span className="text-slate-900 dark:text-white font-bold">12,402</span> events</span>
                <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-[#232f48]">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Rows per page:</span>
                  <select className="bg-transparent border-none text-sm text-primary font-bold focus:ring-0 cursor-pointer outline-none">
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-30" disabled><span className="material-symbols-outlined">first_page</span></button>
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-30" disabled><span className="material-symbols-outlined">chevron_left</span></button>
                <div className="hidden md:flex items-center gap-1 px-4">
                  <button className="size-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                  <button className="size-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold transition-colors">2</button>
                  <button className="size-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold transition-colors">3</button>
                  <span className="px-2 text-slate-500 dark:text-slate-600">...</span>
                  <button className="size-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold transition-colors">496</button>
                </div>
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">last_page</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 3. SLIDE-OUT DRAWER OVERLAY               */}
      {/* ========================================= */}
      
      {/* Overlay Background (Darkens the screen when open) */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] transition-opacity" 
          onClick={() => setIsDrawerOpen(false)} // Clicking outside closes it
        ></div>
      )}

      {/* The Drawer Itself */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white dark:bg-[#111722] border-l border-slate-200 dark:border-[#232f48] shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-[#232f48]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Event Details</h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 mb-2">CRITICAL</span>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Unauthorized login attempt detected from IP 192.168.1.105. Account temporarily locked.</p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Event Metadata</h3>
            <div className="space-y-3 bg-slate-50 dark:bg-[#0c111a] p-4 rounded-xl border border-slate-200 dark:border-[#232f48]">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Timestamp</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white font-mono">2023-10-24 14:22:15.842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Event ID</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white font-mono">EVT-88294-SEC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Source IP</span>
                <span className="text-sm font-medium text-primary underline decoration-primary/30 cursor-pointer">192.168.1.105</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Actor</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Admin_David</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">JSON Payload</h3>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-800">
              <pre className="text-xs text-green-400 font-mono leading-relaxed">
{`{
  "event_type": "security_violation",
  "action": "login_attempt",
  "status": "failed",
  "reason": "invalid_credentials",
  "attempts": 5,
  "lockout_triggered": true,
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "geo_location": {
    "country": "Unknown",
    "city": "Unknown"
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-[#232f48] flex gap-3">
          <button className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold transition-colors">
            Dismiss Alert
          </button>
          <button className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-colors">
            Take Action
          </button>
        </div>
      </div>

    </div>
  );
}