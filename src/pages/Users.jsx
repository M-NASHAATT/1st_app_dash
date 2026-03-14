import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Users() {
   const navigate = useNavigate();
  // --- 1. THE DATA (Simulating a Database) ---
  // 1. Generate 25 fake users so we can test Pagination
  const [users, setUsers] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: `US-${90000 + i}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      nationalId: `•••• •••• ${1000 + i}`,
      status: i % 3 === 0 ? "Pending" : "Active",
      role: i % 5 === 0 ? "Admin" : "Standard User",
      provider: i % 2 === 0 ? "Google" : "Email",
      avatar: `https://i.pravatar.cc/150?u=${i}`
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7; // Change this number to make the box larger or smaller!
  


  // --- 2. HELPER FUNCTIONS ---
  const getStatusStyles = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/20";
      case "Pending": return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-500/20";
      case "Suspended": return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-500/20";
      default: return "";
    }
  };
  
  const getStatusDot = (status) => {
    switch (status) {
      case "Active": return "bg-emerald-500";
      case "Pending": return "bg-orange-500";
      case "Suspended": return "bg-slate-500";
      default: return "bg-slate-500";
    }
  };

  //searchbar
const filteredUsers = users.filter((user) => {
    if (searchTerm === "") return true; // Show everyone if empty
    
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.id.toLowerCase().includes(searchLower)
    );
  });

  // 3. PAGINATION MATH
  // Find out where to slice the array based on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  
  // This is the actual list of users that will show on the screen right now
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Calculate how many total pages we need
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="flex flex-col gap-8">
      
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h2>
          <p className="text-sm text-slate-500 font-medium">Monitoring 1,240 platform users across categories</p>
        </div>
        <div className="flex items-center gap-4">
          
        </div>
      </div>

      {/* QUICK STATS CARDS (ALL 3 RESTORED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">

        {/* Card 1 */}
        <div className="p-6 rounded-xl border border-primary/10 bg-white dark:bg-primary/5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Platform Users</p>
            <h3 className="text-3xl font-bold mt-1">1,240</h3>
            <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>12% growth</span>
            </div>
          </div>
          <div className="p-4 bg-primary/10 rounded-xl text-primary">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl border border-primary/10 bg-white dark:bg-primary/5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">accepted reports</p>
            <h3 className="text-3xl font-bold mt-1">856</h3>
            <div className="flex items-center gap-1 mt-2 text-emerald-500 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>5% increase</span>
            </div>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-xl text-emerald-500">
            <span className="material-symbols-outlined text-3xl">bolt</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl border border-primary/10 bg-white dark:bg-primary/5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending Approvals</p>
            <h3 className="text-3xl font-bold mt-1">42</h3>
            <div className="flex items-center gap-1 mt-2 text-orange-500 text-sm font-bold">
              <span className="material-symbols-outlined text-sm">pending_actions</span>
              <span>Action Required</span>
            </div>
          </div>
          <div className="p-4 bg-orange-500/10 rounded-xl text-orange-500">
            <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
          </div>
        </div>
      </div>

      {/* TABLE CONTROLS */}
      <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-wrap items-center gap-4 shrink-0">
        <div className="flex-1 min-w-[300px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text"
            placeholder="Search by User ID, Name, or Email..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border-primary/10 bg-background-light dark:bg-background-dark/50 text-sm focus:ring-primary focus:border-primary outline-none" 
  
             // THESE TWO LINES ARE THE MAGIC CONNECTION:
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-lg">filter_alt</span>More Filters
            </button>
            <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/10 text-slate-500"><span className="material-symbols-outlined">download</span></button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="sticky top-0 bg-slate-50 dark:bg-background-dark border-b border-primary/10 z-20">
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500"><input type="checkbox" className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary"/></th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">User ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Full Name</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">National ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Account Status</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Type</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Provider</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5">
              {/* THIS LOOP RENDERS THE DATA */}
              {currentUsers.map((user) => (
                <tr key={user.id} onClick={() => navigate('/user-details')}
                className="hover:bg-primary/5 transition-colors group">
                  
                  <td className="px-6 py-4"><input className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary" type="checkbox" /></td>
                  <td className="px-6 py-4 font-mono text-xs text-primary font-medium">{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center" style={{ backgroundImage: `url('${user.avatar}')` }}></div>
                      <div className="flex flex-col"><span className="text-sm font-bold">{user.name}</span><span className="text-xs text-slate-500">{user.email}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{user.nationalId}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(user.status)}`}>
                      <span className={`size-1.5 rounded-full ${getStatusDot(user.status)}`}></span> {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{user.role}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2 text-sm text-slate-500"><span className="material-symbols-outlined text-lg">mail</span>{user.provider}</div></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">block</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
{/* --- PAGINATION FOOTER --- */}
        <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-slate-50/50 dark:bg-background-dark/50 shrink-0">
          
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">{indexOfFirstUser + 1}</span> to <span className="text-slate-900 dark:text-white font-bold">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredUsers.length}</span> results
          </p>
          
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-primary/10 text-slate-400 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>

            {/* Generate Page Numbers Dynamically */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button 
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`size-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === pageNumber 
                      ? "bg-primary text-white" // Active page style
                      : "hover:bg-primary/10 text-slate-500" // Inactive page style
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-primary/10 text-slate-400 disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>
    </div>
  );
}