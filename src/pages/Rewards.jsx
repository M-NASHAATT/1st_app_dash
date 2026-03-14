import { useNavigate } from 'react-router-dom';

export default function Rewards() {
    const navigate = useNavigate();
    
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
      <main className="max-w-[1440px] w-full mx-auto px-6 py-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Rewards Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your store items, inventory, and point exchange rates.</p>
          </div>
          <button 
            onClick={() => navigate('/add-reward')} 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
            <span className="material-symbols-outlined">add_circle</span>
            Add New Reward
            </button>
        </div>

        {/* --- SUMMARY METRICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Active Rewards</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1,284</h3>
              <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>5.2%</span>
                <span className="text-slate-400 font-normal ml-1">vs last month</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-xl text-primary">
              <span className="material-symbols-outlined text-2xl">loyalty</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Points Redeemed (MTD)</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">450.2k</h3>
              <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>12.8%</span>
                <span className="text-slate-400 font-normal ml-1">vs last month</span>
              </div>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
              <span className="material-symbols-outlined text-2xl">toll</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start justify-between shadow-sm border-l-4 border-l-red-500">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Low Stock Alerts</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">12 Items</h3>
              <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-bold">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>Immediate action needed</span>
              </div>
            </div>
            <div className="bg-red-500/10 p-3 rounded-xl text-red-500">
              <span className="material-symbols-outlined text-2xl">inventory_2</span>
            </div>
          </div>
        </div>

        {/* --- TOOLBAR & FILTERS --- */}
        <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">filter_list</span>
              <select className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-1.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-700 dark:text-slate-300 outline-none">
                <option>All Categories</option>
                <option>Gear</option>
                <option>Donations</option>
                <option>Electronics</option>
                <option>Gift Cards</option>
              </select>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">flag</span>
              <select className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-1.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-700 dark:text-slate-300 outline-none">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <span className="material-symbols-outlined text-base">close</span>
              Clear Filters
            </button>
          </div>
          <div className="text-sm text-slate-400">
            Showing <strong>1-10</strong> of 1,284 results
          </div>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reward Item</th>
                  {/* CATEGORY COLUMN REMOVED HERE */}
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Points Cost</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Stock Level</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                
                {/* Item 1 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1">
                        <img alt="Reward" className="rounded-md opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn215k9MNSK2Dh415isAaq-dDXb_zVb5nJPX-G0TzVWKpUufqmt4Dg2Depzvu2o9jlrjUaZmTFQOM832Xfa7G6Cy7vCgLb05TZwam7XpwIUm_mnA5i2HDiln-G_du3OHQfTC9jMedKO0_Tm1lYhvLieR9Hkr9Q49BU3pgYEDRlq0LqiBQmuteFgaIDczADVm0E9ioXZq2FsNCMkmtyUu1BhzMXM4YiGlbuQxCBcTNrJsIbTAMJ6bXX2-oDINUAhMuxd6XAsWV1vQ"/>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Premium Water Bottle</p>
                        <p className="text-xs text-slate-400">SKU: BS-RE-001</p>
                      </div>
                    </div>
                  </td>
                  {/* CATEGORY DATA REMOVED HERE */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary font-bold">2,500 pts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">85/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit"><span className="material-symbols-outlined text-[20px]">edit_note</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" title="Toggle Status"><span className="material-symbols-outlined text-[20px]">visibility_off</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete"><span className="material-symbols-outlined text-[20px]">delete_outline</span></button>
                    </div>
                  </td>
                </tr>

                {/* Item 2 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1">
                        <img alt="Reward" className="rounded-md opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKbEbIFcK_Dnty1hBg35fOi1bBpTIpcoCj9Ml6lIhmBbEUQpFHGKpgnG2Dyr7JzaqGbozAm4ypjUj7w9HYpshSFWQ7dwxvFPy8HPlK7CSWAPCNuOC-vRvCdAMV9iJ2ex3-cIy2oWRmakSh1ugYUJOkzmGd-sji0Adi1DIL7kQ0iIOho8FQrU2QLmJ5OQgftnWJxFRwWvdnfcbb8_rCmFfeFPyv1pfNozehcJYzSIYuS-HKnrQ0asr50Ftc_m5HIG_3zxyuoSBRMQ"/>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Charity Donation $10</p>
                        <p className="text-xs text-slate-400">SKU: BS-RE-042</p>
                      </div>
                    </div>
                  </td>
                  {/* CATEGORY DATA REMOVED HERE */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary font-bold">1,000 pts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400" style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">∞</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">edit_note</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">visibility_off</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">delete_outline</span></button>
                    </div>
                  </td>
                </tr>

                {/* Item 3 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1 relative overflow-hidden">
                        <img alt="Reward" className="rounded-md opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS_oG5cI3Xw7iD5PImY6RuJHcho___jeW5KEqZ1zYuE2rw6iP_Dk1baVFPqF40hToJv5xB1qusiCEZskyyAU7fu9AyXQEgQOv7ZfljRbcZGLnJFkwPfM2KMByFpc7At5MeO_xZqYV27ONSvT7EQbY_giVTF6O-brwpKBnedXk99Ljky3KLAluuaLT92NkDDXnbz_JNXdZYM8y_VwuAcc7WfK-9s8rmM_faXZ_q9W-DKJfaM-M2imQW2_eohJ4RS2J2lvYlk3-QFA"/>
                        <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-red-500 text-xs">priority_high</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Wireless Headphones</p>
                        <p className="text-xs text-slate-400">SKU: BS-RE-088</p>
                      </div>
                    </div>
                  </td>
                  {/* CATEGORY DATA REMOVED HERE */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-primary font-bold">15,000 pts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: "2%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-red-500">2/50</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                      Low Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">edit_note</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">visibility_off</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">delete_outline</span></button>
                    </div>
                  </td>
                </tr>

                {/* Item 4 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 text-slate-400 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1">
                        <img alt="Reward" className="rounded-md opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRkIdelzwM6BX3K7Dm35QpxnHlVYHNgMBB4Bi6f9Dogzv_JgGOn0_d2Sqm8toKHB-_ZKmRXm9ZzkG34Bv3NNyd-NCOSHkL-yyW3RNMKVZS8OrPPteW37xmLy0fvzPik-yJhCdTINkXd-WkdTBp9Gc9Q-VTf5o9H1URyvizDsVZ-VNFVxZBUivGxJQsk3jRmXpjDLs8SZhB1WOV8gWO-7dWBrsxVHSZksJKdxL1EjUF37Co6Rk3OI1hWyM8aV4a-CPvv99iIw9xZg"/>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Branded Hoodie</p>
                        <p className="text-xs">SKU: BS-RE-102</p>
                      </div>
                    </div>
                  </td>
                  {/* CATEGORY DATA REMOVED HERE */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-slate-500 font-bold">5,500 pts</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400" style={{ width: "0%" }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-400">0/150</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">
                      Out of Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">edit_note</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">delete_outline</span></button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          
          {/* --- PAGINATION --- */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
              <button className="w-8 h-8 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">3</button>
              <span className="text-slate-400 mx-1">...</span>
              <button className="w-8 h-8 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">128</button>
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-white dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-[1440px] w-full mx-auto px-6 py-8 mt-auto border-t border-slate-200 dark:border-slate-800/50 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 dark:text-slate-400 text-xs">
          <div className="flex items-center gap-6">
            <p>© 2024 Blue Sentinel Administrative Portal</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>System Status: Optimal</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a className="hover:text-primary transition-colors" href="#">Help Center</a>
            <a className="hover:text-primary transition-colors" href="#">API Documentation</a>
            <a className="hover:text-primary transition-colors" href="#">Security Audit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}