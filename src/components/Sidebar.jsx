import { NavLink } from 'react-router-dom';
import myLogo from '../assets/sidebar-logo.svg'; 

export default function Sidebar({ isOpen, setIsOpen }) {
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      {/* ANIMATED WIDTH FOR DESKTOP COLLAPSE */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-[#0a0f18] border-r border-primary/10 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:border-none'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-primary/10 w-64">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
              <img src={myLogo} alt="Blue Sentinel Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white whitespace-nowrap">Blue Sentinel</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar w-64">
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
            <span className="material-symbols-outlined">workspace_premium</span>Rewards Management
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