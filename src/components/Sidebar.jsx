import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import myLogo from '../assets/sidebar-logo.svg'; 

export default function Sidebar({ isOpen, setIsOpen }) {
  // 1. STATE FOR DROPDOWN MENUS
  const [isMainAppOpen, setIsMainAppOpen] = useState(true);
  const [isRecyclingOpen, setIsRecyclingOpen] = useState(false);

  // Close the sidebar automatically when a link is clicked on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  // Helper function for NavLink classes
  const navClass = ({ isActive }) => 
    isActive 
      ? "nav-item active flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-bold transition-all" 
      : "nav-item flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-all";

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      {/* SIDEBAR WRAPPER */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-[#0a0f18] border-r border-primary/10 flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:border-none'
        }`}
      >
        {/* LOGO HEADER */}
        <div className="p-6 flex items-center justify-between border-b border-primary/10 w-64 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
              <img src={myLogo} alt="Blue Sentinel Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900 dark:text-white whitespace-nowrap">Blue Sentinel</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Workspace</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar w-64">
          
          {/* ========================================= */}
          {/* GLOBAL PAGES (Solo / Top Level)           */}
          {/* ========================================= */}
          <div className="space-y-1">
            <NavLink to="/" onClick={handleLinkClick} className={navClass}>
              <span className="material-symbols-outlined">dashboard</span>Platform Dashboard
            </NavLink>
            <NavLink to="/users" onClick={handleLinkClick} className={navClass}>
              <span className="material-symbols-outlined">group</span>User Management
            </NavLink>
          </div>

          {/* ========================================= */}
          {/* MENU 1: MAIN APP                          */}
          {/* ========================================= */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50">
            <button 
              onClick={() => setIsMainAppOpen(!isMainAppOpen)}
              className="w-full flex items-center justify-between px-2 mb-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Sentinel App</span>
              <span className="material-symbols-outlined text-sm">{isMainAppOpen ? 'expand_more' : 'chevron_right'}</span>
            </button>
            
            {/* The Links */}
            {isMainAppOpen && (
              <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                <NavLink to="/general" onClick={handleLinkClick} className={navClass}>
                  <span className="material-symbols-outlined">apps</span>General Overview
                </NavLink>
                <NavLink to="/reports" onClick={handleLinkClick} className={navClass}>
                  <span className="material-symbols-outlined">description</span>Waste Reports
                </NavLink>
                <NavLink to="/rewards" onClick={handleLinkClick} className={navClass}>
                  <span className="material-symbols-outlined">workspace_premium</span>Rewards Store
                </NavLink>
              </div>
            )}
          </div>

          {/* ========================================= */}
          {/* MENU 2: RECYCLING APP                     */}
          {/* ========================================= */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50">
            <button 
              onClick={() => setIsRecyclingOpen(!isRecyclingOpen)}
              className="w-full flex items-center justify-between px-2 mb-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Procurement App</span>
              <span className="material-symbols-outlined text-sm">{isRecyclingOpen ? 'expand_more' : 'chevron_right'}</span>
            </button>

            {/* The Links */}
            {isRecyclingOpen && (
              <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                <NavLink to="/recycling/inventory" onClick={handleLinkClick} className={navClass}>
                  <span className="material-symbols-outlined">inventory_2</span>Inventory & Batches
                </NavLink>
                <NavLink to="/recycling/orders" onClick={handleLinkClick} className={navClass}>
                  <span className="material-symbols-outlined">local_shipping</span>Order Management
                </NavLink>
              </div>
            )}
          </div>

          {/* ========================================= */}
          {/* SYSTEM LINKS                              */}
          {/* ========================================= */}
          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/50">
            <p className="px-2 mb-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">System</p>
            <div className="space-y-1">
              <NavLink to="/logs" onClick={handleLinkClick} className={navClass}>
                <span className="material-symbols-outlined">history</span>Activity Logs
              </NavLink>
              <NavLink to="/settings" onClick={handleLinkClick} className={navClass}>
                <span className="material-symbols-outlined">settings</span>Settings
              </NavLink>
            </div>
          </div>

        </nav>
      </aside>
    </>
  );
}