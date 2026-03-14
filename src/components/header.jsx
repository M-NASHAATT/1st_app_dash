export default function Header({ toggleDark, isProfileOpen, setIsProfileOpen, toggleSidebar }) {
  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-8 border-b border-primary/10 backdrop-blur-md bg-white/70 dark:bg-[#101622]/70 sticky top-0 z-40">
      
      <div className="flex items-center gap-4">
        {/* HAMBURGER MENU BUTTON (Mobile Only) */}
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg lg:hidden hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500 hover:text-primary"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <h2 className="font-semibold text-lg hidden sm:block text-slate-900 dark:text-white">Admin Overview</h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 dark:bg-[#151c2c] border border-primary/10 focus:outline-none focus:ring-1 focus:ring-primary text-sm" 
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-background-dark">3</span>
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDark} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hover:text-primary">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
            className="flex items-center gap-3 p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full border border-primary/20" alt="Admin" />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-none text-slate-900 dark:text-white">Admin User</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Super Admin</p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#151c2c] shadow-xl rounded-xl border border-primary/10 flex flex-col p-2 z-50">
              <a href="#" className="p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">My Profile</a>
              <a href="#" className="p-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300">Settings</a>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
              <a href="#" className="p-2 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}