import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Settings() {
  // 1. STATE FOR TABS
  const [activeTab, setActiveTab] = useState('general');

  // 2. STATE FOR ALL SETTINGS (So toggles and inputs actually work)
  const [settings, setSettings] = useState({
    appName: "Blue Sentinel",
    supportEmail: "ops@bluesentinel.ai",
    apiUrl: "https://api-v2.bluesentinel.cloud/v1",
    maintenanceMode: false,
    publicRegistration: true,
    aiModeration: true,
    notifications: true,
  });

  // 3. HELPER: Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 4. PRO FEATURE: Copy to Clipboard
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(settings.apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      
      {/* --- PAGE HEADER --- */}
      <header className="h-16 shrink-0 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-8 bg-white/50 dark:bg-background-dark/50 backdrop-blur-md">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Settings & Configuration</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Version 2.4.0</span>
        </div>
      </header>

      {/* --- MAIN LAYOUT (VERTICAL TABS) --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Tabs) */}
        <aside className="w-64 border-r border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-[#111722]/50 p-6 flex flex-col gap-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Configuration</p>
          
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'general' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">tune</span> General
          </button>
          
          <button 
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'system' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">dns</span> System & AI
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'notifications' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">notifications_active</span> Notifications
          </button>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* ==================================== */}
            {/* TAB 1: GENERAL SETTINGS              */}
            {/* ==================================== */}
            {activeTab === 'general' && (
              <>
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">General App Details</h3>
                  </div>
                  <div className="bg-white dark:bg-[#1c2433] p-6 rounded-xl border border-slate-200 dark:border-border-dark grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Application Name</label>
                      <input 
                        name="appName" value={settings.appName} onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" 
                        type="text" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Support Email</label>
                      <input 
                        name="supportEmail" value={settings.supportEmail} onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" 
                        type="email" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">API Endpoint URL</label>
                      <div className="relative">
                        <input 
                          name="apiUrl" value={settings.apiUrl} onChange={handleChange}
                          className="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-border-dark rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all pr-12" 
                          type="text" 
                        />
                        <button 
                          onClick={copyToClipboard}
                          className="absolute right-2 top-1.5 p-1 rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
                          title="Copy to clipboard"
                        >
                          <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-6 mt-8">
                    <span className="material-symbols-outlined text-primary">public</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Public Access</h3>
                  </div>
                  <div className="bg-white dark:bg-[#1c2433] p-5 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg"><span className="material-symbols-outlined">person_add</span></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Public Registration</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Allow new users to sign up for the platform</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input name="publicRegistration" type="checkbox" checked={settings.publicRegistration} onChange={handleChange} className="sr-only peer"/>
                      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.publicRegistration ? 'bg-primary after:translate-x-full after:border-white' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    </label>
                  </div>
                </section>
              </>
            )}

            {/* ==================================== */}
            {/* TAB 2: SYSTEM & AI                   */}
            {/* ==================================== */}
            {activeTab === 'system' && (
              <>
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary">dns</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">System-level Status</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Database */}
                    <div className="bg-white dark:bg-[#1c2433] p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col justify-between shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <span className="material-symbols-outlined text-emerald-500 text-3xl">database</span>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wide">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span> Optimal
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Database Connection</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">PostgreSQL Cluster-A is responding within 12ms.</p>
                      </div>
                    </div>
                    {/* Storage */}
                    <div className="bg-white dark:bg-[#1c2433] p-6 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">storage</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">72% Used</span>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Storage</p>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">3.6TB of 5TB</p>
                        </div>
                      </div>
                    </div>
                    {/* AI Engine */}
                    <div className="bg-white dark:bg-[#1c2433] p-6 rounded-xl border border-slate-200 dark:border-border-dark flex flex-col justify-between shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="relative">
                          <span className="material-symbols-outlined text-indigo-500 text-3xl">neurology</span>
                          <span className="absolute -top-1 -right-1 size-2.5 bg-indigo-500 rounded-full animate-ping"></span>
                        </div>
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wide">Active</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">AI Engine Status</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">NVIDIA TensorRT processing active workloads.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mt-8 space-y-4">
                  {/* Maintenance Mode Toggle */}
                  <div className="bg-white dark:bg-[#1c2433] p-5 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm hover:border-amber-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg"><span className="material-symbols-outlined">construction</span></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">Maintenance Mode</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Suspend public access for system updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input name="maintenanceMode" type="checkbox" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer"/>
                      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.maintenanceMode ? 'bg-amber-500 after:translate-x-full after:border-white' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    </label>
                  </div>
                  
                  {/* AI Auto-Moderation Toggle */}
                  <div className="bg-white dark:bg-[#1c2433] p-5 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm hover:border-indigo-500/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-lg"><span className="material-symbols-outlined">psychology</span></div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">AI Auto-Moderation</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Enable real-time content filtering and report verification</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input name="aiModeration" type="checkbox" checked={settings.aiModeration} onChange={handleChange} className="sr-only peer"/>
                      <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.aiModeration ? 'bg-indigo-500 after:translate-x-full after:border-white' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                    </label>
                  </div>
                </section>
              </>
            )}

            {/* ==================================== */}
            {/* TAB 3: NOTIFICATIONS                   */}
            {/* ==================================== */}
            {activeTab === 'notifications' && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary">notifications_active</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                </div>
                
                <div className="bg-white dark:bg-[#1c2433] p-5 rounded-xl border border-slate-200 dark:border-border-dark flex items-center justify-between shadow-sm mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg"><span className="material-symbols-outlined">notifications</span></div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Master Notification Switch</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Enable or disable all system alerts</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input name="notifications" type="checkbox" checked={settings.notifications} onChange={handleChange} className="sr-only peer"/>
                    <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.notifications ? 'bg-emerald-500 after:translate-x-full after:border-white' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                  </label>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <footer className="h-20 shrink-0 border-t border-slate-200 dark:border-border-dark px-8 flex items-center justify-between bg-white dark:bg-[#111722]">
        <p className="text-sm text-slate-500 italic flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">history</span> Last updated: Just now
        </p>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-border-dark font-bold text-sm text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1c2433] transition-colors">
            Discard Changes
          </button>
          <button 
                            onClick={() => toast.success('System settings updated successfully!')} // <--- ADD THIS onClick
                            className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2"
                            >
                            <span className="material-symbols-outlined text-lg">save</span> Save Changes
                            </button>
        </div>
      </footer>

    </div>
  );
}