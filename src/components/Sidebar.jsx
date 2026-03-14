import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
  // Close the sidebar automatically when a link is clicked on mobile!
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* 1. MOBILE OVERLAY: Darkens the screen when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. THE SIDEBAR */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0a0f18] border-r border-primary/10 flex flex-col h-full shrink-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* LOGO HEADER */}
        <div className="p-6 flex items-center justify-between border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white">Blue Sentinel</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
          </div>
          
          {/* Close button for mobile only */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          
          <p className="px-3 mt-2 mb-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Main</p>
          
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
            <span className="material-symbols-outlined">dashboard</span>Dashboard
          </NavLink>
          
          <NavLink to="/users" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
            <span className="material-symbols-outlined">group</span>User Management
          </NavLink>

          <NavLink to="/general" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
            <span className="material-symbols-outlined">apps</span>General App
          </NavLink>
          
          <NavLink to="/reports" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
            <span className="material-symbols-outlined">description</span>Reports
          </NavLink>

          <NavLink to="/rewards" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
            <span className="material-symbols-outlined">emoji_events</span>Rewards Management
          </NavLink>

          <div className="pt-4 mt-4 border-t border-primary/10 dark:border-slate-800">
            <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">System</p>
            
            <NavLink to="/logs" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
              <span className="material-symbols-outlined">history</span>Activity Logs
            </NavLink>
            
            <NavLink to="/settings" onClick={handleLinkClick} className={({ isActive }) => isActive ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all"}>
              <span className="material-symbols-outlined">settings</span>Settings
            </NavLink>
          </div>

        </nav>
      </aside>
    </>
  );
}