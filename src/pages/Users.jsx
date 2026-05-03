import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await userService.getAllUsers();
        
        console.log("BACKEND USERS RESPONSE:", responseData); // Check console to see the real data!

        // THE ULTIMATE LARAVEL UNWRAPPER
        let usersArray = [];
        
        if (Array.isArray(responseData)) {
          usersArray = responseData; 
        } else if (Array.isArray(responseData?.data?.data)) {
          usersArray = responseData.data.data; 
        } else if (Array.isArray(responseData?.data)) {
          usersArray = responseData.data; 
        } else if (Array.isArray(responseData?.data?.users)) { // <--- ADDED THIS NEW CHECK
          usersArray = responseData.data.users; 
        } else if (Array.isArray(responseData?.users)) {
          usersArray = responseData.users; 
        }

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

  const handleStatusChange = async (id, newStatus) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));

    try {
      await userService.updateStatus(id, newStatus);
      toast.success("User status updated!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Could not save status to server.");
    }
  };
  // Add this right below handleStatusChange for the block button
  const handleBlockUser = (id, name) => {
    if (window.confirm(`Are you sure you want to block ${name}? They will lose access to the platform.`)) {
      handleStatusChange(id, 'blocked');
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

  // ULTRA-SAFE ARRAY CHECK
  // This guarantees that React will never try to filter an Object again!
  const safeUsersArray = Array.isArray(users) ? users : [];

  const filteredUsers = safeUsersArray.filter((user) => {
    if (searchTerm === "") return true;
    const searchLower = searchTerm.toLowerCase();
    
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
      </div>

      <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden min-h-[400px] relative">
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#151c2c]/50 backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-background-dark border-b border-primary/10">
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">User ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 w-16">Photo</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Full Name</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Email Address</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">National ID</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500">Role</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 text-center">Status</th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5 dark:divide-slate-800/50">
              
              {/* EMPTY STATE */}
              {!isLoading && currentUsers.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}

              {/* DYNAMIC ROWS */}
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary/5 dark:hover:bg-slate-800/30 transition-colors group">
                  
                  {/* 1. USER ID (Now Clickable!) */}
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => navigate(`/user-details/${user.id}`)}
                      className="font-mono text-xs font-bold text-primary hover:underline hover:text-blue-600 transition-colors"
                    >
                      {user.user_id || `US-${user.id}`}
                    </button>
                  </td>
                  
                  {/* 2. PHOTO COLUMN (Separated) */}
                  <td className="px-6 py-4">
                    <div 
                      className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 bg-cover bg-center border border-slate-300 dark:border-slate-700 shadow-sm" 
                      style={{ backgroundImage: `url('${user.image || "https://api.dicebear.com/7.x/initials/svg?seed=" + user.name}')` }}
                    ></div>
                  </td>

                  {/* 3. FULL NAME */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </span>
                  </td>

                  {/* 4. EMAIL */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {user.email}
                    </span>
                  </td>
                  
                  {/* 5. NATIONAL ID */}
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {user.national_id || "N/A"}
                  </td>

                  {/* 6. ROLE */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                        ${user.role?.toLowerCase() === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : 
                          user.role?.toLowerCase() === 'provider' ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20' : 
                          'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}
                      `}
                    >
                      {user.role || 'User'}
                    </span>
                  </td>
                  
                  {/* 7. STATUS DROPDOWN */}
                  <td className="px-6 py-4 text-center">
                    <select
                      value={user.status?.toLowerCase() || "active"}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border outline-none cursor-pointer appearance-none text-center ${getStatusStyles(user.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      <option value="active" className="text-slate-900 bg-white">Active</option>
                      <option value="pending" className="text-slate-900 bg-white">Pending</option>
                      <option value="blocked" className="text-slate-900 bg-white">Blocked</option>
                    </select>
                  </td>
                  
                  {/* 8. ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/user-details/${user.id}`)}
                        className="p-1.5 rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors"
                        title="View Details"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button 
                        onClick={() => handleBlockUser(user.id, user.name)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                        title="Block User"
                      >
                        <span className="material-symbols-outlined text-lg">block</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
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