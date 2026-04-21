import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService'; // Make sure this path is correct!

export default function Users() {
  const navigate = useNavigate();

  // 1. REAL STATE (Starts empty, fills with API data)
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Shows a loader until data arrives

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // 2. THE API CALL (Runs once when page opens)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // This calls your backend: GET /admin/users
        const data = await userService.getAllUsers();
        
        // The backend probably sends { data: [...] } or just an array [...]
        // Let's handle both just in case!
        const usersArray = Array.isArray(data) ? data : data.data || [];
        
        setUsers(usersArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load users from backend:", error);
        toast.error("Failed to load users from the server.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 3. STATUS UPDATE API CALL
  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI Update (Change it instantly on screen)
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));

    try {
      // Send the change to the backend: PUT /admin/users/{id}/status
      await userService.updateStatus(id, newStatus);
      toast.success("User status updated!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Could not save status to server.");
      // Revert the UI if the server failed (Optional, but good practice)
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "active": 
      case "Active": 
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/20";
      case "pending": 
      case "Pending": 
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-500/20";
      case "blocked": 
      case "Blocked": 
        return "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-500/20";
      default: return "";
    }
  };

  const filteredUsers = users.filter((user) => {
    if (searchTerm === "") return true;
    const searchLower = searchTerm.toLowerCase();
    
    // Safety check: Make sure the fields exist before calling toLowerCase()
    const nameMatch = user.name ? user.name.toLowerCase().includes(searchLower) : false;
    const emailMatch = user.email ? user.email.toLowerCase().includes(searchLower) : false;
    const idMatch = user.id ? user.id.toString().toLowerCase().includes(searchLower) : false;
    
    return nameMatch || emailMatch || idMatch;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h2>
          <p className="text-sm text-slate-500 font-medium">Monitoring platform users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-lg">person_add</span> Add New User
        </button>
      </div>

      <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-4 flex flex-wrap items-center gap-4 shrink-0">
        <div className="flex-1 min-w-[300px] relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border-primary/10 bg-background-light dark:bg-background-dark/50 text-sm focus:ring-primary focus:border-primary outline-none" 
            placeholder="Search by Name or ID..." type="text" 
          />
        </div>
        <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/10 text-slate-500"><span className="material-symbols-outlined">download</span></button>
      </div>

      <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden min-h-[400px] relative">
        
        {/* THE LOADING SPINNER */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#151c2c]/50 backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-background-dark border-b border-primary/10">
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">User ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Full Name</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">National ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Account Status</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5">
              
              {/* EMPTY STATE (If backend sends 0 users) */}
              {!isLoading && currentUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}

              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-primary font-medium">{user.id}</td>
                  
                  <td className="px-6 py-4">
                    <div 
                      onClick={() => navigate(`/user-details/${user.id}`)}
                      className="flex items-center gap-3 cursor-pointer p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex"
                    >
                      {/* Note: The backend might send 'profile_picture' instead of 'avatar'. Let's check both! */}
                      <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center" style={{ backgroundImage: `url('${user.avatar || user.profile_picture || "https://i.pravatar.cc/150"}')` }}></div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary">{user.name}</span>
                        <span className="text-xs text-slate-500">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-slate-500">{user.national_id || "N/A"}</td>
                  
                  <td className="px-6 py-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer appearance-none text-center ${getStatusStyles(user.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      {/* The backend uses lowercase statuses usually, so let's match their API docs */}
                      <option value="active" className="text-slate-900 bg-white">Active</option>
                      <option value="pending" className="text-slate-900 bg-white">Pending</option>
                      <option value="blocked" className="text-slate-900 bg-white">Blocked</option>
                    </select>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">block</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-slate-50/50 dark:bg-background-dark/50">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">{filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1}</span> to <span className="text-slate-900 dark:text-white font-bold">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="text-slate-900 dark:text-white font-bold">{filteredUsers.length}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-primary/10 text-slate-400 disabled:opacity-30"><span className="material-symbols-outlined text-xl">chevron_left</span></button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`size-8 rounded-lg text-xs font-bold transition-colors ${currentPage === pageNumber ? "bg-primary text-white" : "hover:bg-primary/10 text-slate-500"}`}>{pageNumber}</button>
              );
            })}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-primary/10 text-slate-400 disabled:opacity-30"><span className="material-symbols-outlined text-xl">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}