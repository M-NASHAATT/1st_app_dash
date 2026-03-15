import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock Admin Data
  const [adminData, setAdminData] = useState({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@bluesentinel.ai",
    phone: "+1 (555) 019-8234",
    role: "Super Administrator",
    department: "System Operations",
    timezone: "UTC -08:00 (Pacific Time)"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="flex flex-col gap-8 h-full bg-background-light dark:bg-background-dark overflow-y-auto custom-scrollbar p-6 lg:p-8">
      
      <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
        
        {/* --- HEADER & COVER PHOTO --- */}
        <div className="bg-white dark:bg-[#1a2235] rounded-3xl border border-slate-200 dark:border-[#2d3a54] overflow-hidden shadow-sm">
          
          {/* Cover Photo */}
          <div className="h-48 w-full bg-gradient-to-r from-primary/80 to-indigo-600/80 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <button className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium">
              <span className="material-symbols-outlined text-sm">edit</span> Change Cover
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              
              {/* Avatar */}
              <div className="flex items-end gap-6 -mt-12 relative z-10">
                <div className="relative group">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEq7MEUe7Ttrnx4ZxBVpf7KCyUxmFgKwMoanIQNpT0N177Cn2EQ_Bwdw3WglDuonFr4mMCQ2IzGKqMR-SxCS4o88vUtJ37W3HZfHbaXl8FgWMbQSN57iIByScxWqB7EmPFIGMwEhasKCOmZd-zrxHTifdxg-vSqr9GvTIrj7J4E5ZwsaLHugyJvBGyYWfGtC_iPSNBxVoETqH_EF4olFp3QcoXuNTrhGyhf5GV3EC3efGU4HELNDrOzOBZ0BJ9fg9jsZJAXxxRFA" 
                    alt="Admin Profile" 
                    className="w-32 h-32 rounded-2xl border-4 border-white dark:border-[#1a2235] object-cover bg-slate-100"
                  />
                  <button className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border-4 border-transparent">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </button>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-[#1a2235] rounded-full shadow-lg"></div>
                </div>

                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {adminData.firstName} {adminData.lastName}
                  </h1>
                  <p className="text-primary font-bold flex items-center gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    {adminData.role}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-[#2d3a54] text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-[#101622] transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">save</span> Save Profile
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">edit_document</span> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column (Main Info) */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Personal Information Form */}
            <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_circle</span>
                Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    defaultValue={adminData.firstName}
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    defaultValue={adminData.lastName}
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    defaultValue={adminData.email}
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    disabled={!isEditing}
                    defaultValue={adminData.phone}
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department</label>
                  <select 
                    disabled={!isEditing}
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed appearance-none"
                  >
                    <option>System Operations</option>
                    <option>Security & Compliance</option>
                    <option>User Management</option>
                    <option>AI Analytics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                Email Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Security Alerts</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get notified about unauthorized access attempts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" disabled={!isEditing}/>
                    <div className="w-11 h-6 bg-slate-200 dark:bg-[#101622] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-slate-300 dark:border-[#2d3a54]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-[#2d3a54] pt-6">
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Weekly Reports</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">A summary of system performance every Monday</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" disabled={!isEditing}/>
                    <div className="w-11 h-6 bg-slate-200 dark:bg-[#101622] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-slate-300 dark:border-[#2d3a54]"></div>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Security & Sessions) */}
          <div className="space-y-8">
            
            {/* Security */}
            <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                Security
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Password</p>
                  <button className="w-full py-2.5 bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#2d3a54]/50 transition-colors">
                    Change Password
                  </button>
                  <p className="text-xs text-slate-500 mt-2 text-center">Last changed 4 months ago</p>
                </div>

                <div className="border-t border-slate-100 dark:border-[#2d3a54] pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Auth</p>
                    <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Enabled</span>
                  </div>
                  <button className="w-full py-2.5 bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#2d3a54]/50 transition-colors">
                    Manage 2FA
                  </button>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">devices</span>
                Active Sessions
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54]">
                  <span className="material-symbols-outlined text-emerald-500">laptop_mac</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">MacBook Pro 16"</p>
                    <p className="text-xs text-slate-500 mt-0.5">Portland, OR • Current Session</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54]">
                  <span className="material-symbols-outlined text-slate-400">phone_iphone</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">iPhone 14 Pro</p>
                    <p className="text-xs text-slate-500 mt-0.5">Seattle, WA • 2 days ago</p>
                  </div>
                </div>

                <button className="w-full py-2.5 mt-2 text-red-500 hover:bg-red-500/10 rounded-xl text-sm font-bold transition-colors">
                  Sign out of all devices
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}