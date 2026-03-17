import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopHeader({ toggleDark, isProfileOpen, setIsProfileOpen, toggleSidebar }) {
  const navigate = useNavigate();

  // 1. STATE FOR NOTIFICATIONS
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Critical Error", message: "Database connection lost in Sector 4.", time: "2 mins ago", type: "error", icon: "error" },
    { id: 2, title: "New Reward Claimed", message: "User Sarah claimed a Premium Water Bottle.", time: "1 hour ago", type: "success", icon: "card_giftcard" },
    { id: 3, title: "System Update", AI: "AI Engine successfully updated to v4.2.", time: "3 hours ago", type: "info", icon: "update" },
  ]);

  // 2. DELETE FUNCTION
  const removeNotification = (idToRemove) => {
    // Filter out the notification that was clicked
    setNotifications(notifications.filter(notif => notif.id !== idToRemove));
  };

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-8 border-b border-primary/10 backdrop-blur-md bg-white/70 dark:bg-[#101622]/70 sticky top-0 z-40">
      
      <div className="flex items-center gap-4">
        {/* Hamburger Menu */}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-primary"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-semibold text-lg hidden sm:block text-slate-900 dark:text-white">Admin Overview</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Search */}
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 dark:bg-[#151c2c] border border-primary/10 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
        </div>

        {/* ========================================= */}
        {/* NOTIFICATIONS DROPDOWN SYSTEM             */}
        {/* ========================================= */}
        <div className="relative">
          
          {/* Bell Icon Button */}
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false); // Close profile if open
            }} 
            className={`p-2 rounded-full transition-colors relative ${isNotifOpen ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            
            {/* The little red badge (Only shows if there are notifications!) */}
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-background-dark">
                {notifications.length}
              </span>
            )}
          </button>

          {/* The Dropdown Menu */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#151c2c] shadow-2xl rounded-2xl border border-slate-200 dark:border-[#2d3a54] flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-[#2d3a54] bg-slate-50 dark:bg-[#101622]">
                <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                <button 
                  onClick={() => setNotifications([])} // Clear All button
                  className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                {notifications.length === 0 ? (
                  
                  /* Empty State */
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">notifications_off</span>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No new notifications</p>
                  </div>

                ) : (
                  
                  /* List of Notifications */
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-slate-100 dark:border-[#2d3a54]/50 hover:bg-slate-50 dark:hover:bg-[#101622]/50 transition-colors flex items-start gap-3 group">
                      
                      <div className={`p-2 rounded-lg flex items-center justify-center shrink-0 ${
                        notif.type === 'error' ? 'bg-red-500/10 text-red-500' :
                        notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">{notif.icon}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{notif.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{notif.message}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">{notif.time}</p>
                      </div>

                      {/* Remove Single Notification Button */}
                      <button 
                        onClick={() => removeNotification(notif.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode */}
        <button onClick={toggleDark} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hover:text-primary text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }} className="flex items-center gap-3 p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full border border-primary/20" alt="Admin" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-none text-slate-900 dark:text-white">Admin User</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#151c2c] shadow-2xl rounded-2xl border border-slate-200 dark:border-[#2d3a54] flex flex-col p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="p-2 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">My Profile</button>
              <button onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} className="p-2 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">Settings</button>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
              <button className="p-2 text-left text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}