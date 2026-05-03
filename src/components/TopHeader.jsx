import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../services/notificationService';
import { adminService } from '../services/adminService'; // 1. IMPORT ADMIN SERVICE

export default function TopHeader({ toggleDark, isProfileOpen, setIsProfileOpen, toggleSidebar, setIsAuthenticated }) {
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 2. NEW STATE FOR ADMIN INFO
  const [adminInfo, setAdminInfo] = useState({
    name: "Loading...",
    image: "https://i.pravatar.cc/150" // Fallback image
  });

  // 3. FETCH NOTIFICATIONS & ADMIN PROFILE ON LOAD
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        // Fetch Notifications
        const notifData = await notificationService.getNotifications();
        setNotifications(notifData?.data?.notifications || []);
        setUnreadCount(notifData?.data?.unread_count || 0);

        // Fetch Admin Profile
        const profileData = await adminService.getMe();
        const admin = profileData?.data?.admin || profileData?.data?.user || profileData?.data || profileData;
        
        if (admin) {
          setAdminInfo({
            name: admin.name || "Admin",
            image: admin.image || admin.avatar || "https://i.pravatar.cc/150"
          });
        }
      } catch (error) {
        console.error("Failed to load header data:", error);
      }
    };

    if (localStorage.getItem("token")) fetchHeaderData();
  }, []);

  const handleMarkAsRead = async (idToRead) => {
    setNotifications(notifications.map(n => n.id === idToRead ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    try { await notificationService.markAsRead(idToRead); } catch (e) {}
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
    try { await notificationService.markAllAsRead(); } catch (e) {}
  };

  const handleDeleteNotif = async (idToRemove, wasUnread) => {
    setNotifications(notifications.filter(notif => notif.id !== idToRemove));
    if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
    try { await notificationService.clearNotification(idToRemove); } catch (e) {}
  };

  const handleDeleteAll = async () => {
    setNotifications([]); setUnreadCount(0); 
    try { await notificationService.clearAll(); } catch (e) {}
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'red': return 'bg-rose-500/10 text-rose-500';
      case 'blue': return 'bg-blue-500/10 text-blue-500';
      case 'green': return 'bg-emerald-500/10 text-emerald-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  const getIconSymbol = (iconName) => {
    switch (iconName) {
      case 'alert-triangle': return 'warning';
      case 'user-plus': return 'domain_add'; 
      case 'user': return 'person';
      default: return 'notifications';
    }
  };

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-8 border-b border-primary/10 backdrop-blur-md bg-white/70 dark:bg-[#101622]/70 sticky top-0 z-40">
      
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-lg lg:hidden hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-semibold text-lg hidden sm:block text-slate-900 dark:text-white">Admin Overview</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 dark:bg-[#151c2c] border border-primary/10 focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
        </div>

        {/* NOTIFICATIONS DROPDOWN */}
        <div className="relative">
          <button 
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }} 
            className={`p-2 rounded-full transition-colors relative ${isNotifOpen ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-background-dark">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-[-60px] md:right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-[#151c2c] shadow-2xl rounded-2xl border border-slate-200 dark:border-[#2d3a54] flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-[#2d3a54] bg-slate-50 dark:bg-[#101622]">
                <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                {notifications.length > 0 && (
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button onClick={handleMarkAllAsRead} className="text-[11px] font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">done_all</span> Mark all read
                      </button>
                    )}
                    <button onClick={handleDeleteAll} className="text-[11px] font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">delete</span> Delete all
                    </button>
                  </div>
                )}
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar flex flex-col">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">notifications_off</span>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b border-slate-100 dark:border-[#2d3a54]/50 hover:bg-slate-50 dark:hover:bg-[#101622]/50 transition-colors flex items-start gap-3 group ${!notif.is_read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                      <div className={`p-2 rounded-lg flex items-center justify-center shrink-0 ${getIconColor(notif.color)}`}>
                        <span className="material-symbols-outlined text-[20px]">{getIconSymbol(notif.icon)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{notif.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{notif.body}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider">{notif.time_ago}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notif.is_read && (
                          <button onClick={() => handleMarkAsRead(notif.id)} className="p-1 rounded-md text-emerald-500 hover:bg-emerald-500/10 transition-colors" title="Mark as read"><span className="material-symbols-outlined text-[16px]">check</span></button>
                        )}
                        <button onClick={() => handleDeleteNotif(notif.id, !notif.is_read)} className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Delete"><span className="material-symbols-outlined text-[16px]">close</span></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={toggleDark} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hover:text-primary text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* ========================================= */}
        {/* THE REAL ADMIN PROFILE BUTTON             */}
        {/* ========================================= */}
        <div className="relative">
          <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }} className="flex items-center gap-3 p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            {/* USING REAL IMAGE */}
            <img src={adminInfo.image} className="w-8 h-8 rounded-full border border-primary/20 object-cover" alt="Admin" />
            <div className="text-left hidden sm:block">
              {/* USING REAL NAME */}
              <p className="text-xs font-bold leading-none text-slate-900 dark:text-white truncate max-w-[100px]">{adminInfo.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#151c2c] shadow-2xl rounded-2xl border border-slate-200 dark:border-[#2d3a54] flex flex-col p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button onClick={() => { navigate('/profile'); setIsProfileOpen(false); }} className="p-2 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">My Profile</button>
              <button onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} className="p-2 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">Settings</button>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
              <button 
                onClick={() => {
                  setIsAuthenticated(false);
                  localStorage.removeItem("isAuthenticated");
                  localStorage.removeItem("token");
                  navigate('/login');
                }}
                className="p-2 text-left text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}