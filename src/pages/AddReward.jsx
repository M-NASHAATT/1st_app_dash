import { useNavigate, Link } from 'react-router-dom';

export default function AddReward() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
      <main className="max-w-[1200px] w-full mx-auto px-6 py-8 lg:px-12">
        
        {/* --- BREADCRUMBS & HEADER --- */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-[#92a4c9] text-sm mb-4">
            <Link to="/rewards" className="hover:text-primary transition-colors">Rewards</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">Add New Reward</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Create Reward</h1>
              <p className="text-slate-500 dark:text-[#92a4c9] mt-1">Configure a new loyalty reward for the sentinel network members.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/rewards')}
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-border-dark text-slate-700 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-surface-dark transition-all"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                Save Reward
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: FORM FIELDS --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Information */}
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">General Information</h3>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-white/80">Reward Title</label>
                    <input 
                      className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      placeholder="e.g. Premium Tech Gear Kit" 
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-white/80">Category</label>
                    <select 
                      className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]" 
                      style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2392a4c9%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')" }}
                    >
                      <option value="">Select Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="vouchers">Vouchers</option>
                      <option value="apparel">Apparel</option>
                      <option value="exclusive">Exclusive Events</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Description</label>
                  <textarea 
                    className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px]" 
                    placeholder="Provide a detailed description of what the user receives..."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Inventory & Pricing */}
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory & Pricing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Point Cost</label>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 pl-12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      placeholder="0" 
                      type="number"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">token</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Stock Quantity</label>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 pl-12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      placeholder="0" 
                      type="number"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">inventory_2</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Offer Details */}
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">event</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Offer Details</h3>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Expiration Date</label>
                  <div className="relative">
                    <input 
                      className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 pl-12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      type="date"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">calendar_today</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Special Conditions</label>
                  <textarea 
                    className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#92a4c9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[80px]" 
                    placeholder="Any restrictions or specific redemption rules..."
                  ></textarea>
                </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: MEDIA & VISIBILITY --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Image Upload */}
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">image</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reward Media</h3>
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-square w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/30 flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                  </div>
                  <p className="text-slate-900 dark:text-white font-medium">Upload Thumbnail</p>
                  <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-2">Recommended: 800x800px<br/>JPG, PNG or WEBP</p>
                </div>
                <button className="w-full py-2 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm text-slate-600 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white transition-colors">
                  Browse Files
                </button>
              </div>
            </section>

            {/* Visibility Settings */}
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">visibility</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Status & Visibility</h3>
              </div>
              <div className="space-y-6">
                
                {/* Toggle Active */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Is Active</span>
                    <span className="text-xs text-slate-500 dark:text-[#92a4c9]">Visible to all users</span>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="relative w-11 h-6 bg-slate-300 dark:bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                {/* Toggle Featured */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Is Featured</span>
                    <span className="text-xs text-slate-500 dark:text-[#92a4c9]">Show in home highlights</span>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="relative w-11 h-6 bg-slate-300 dark:bg-border-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">help</span>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Review Tip</p>
                    <p className="text-[11px] text-slate-600 dark:text-[#92a4c9] leading-relaxed">Featured rewards appear in the main carousel for all platform members.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* --- FOOTER ACTION BUTTONS --- */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-border-dark flex items-center justify-end gap-4 pb-12">
          <button className="text-slate-500 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium px-4">
            Delete Draft
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/rewards')}
              className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-border-dark text-slate-700 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-surface-dark transition-all"
            >
              Discard Changes
            </button>
            <button className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
              Confirm & Publish
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}