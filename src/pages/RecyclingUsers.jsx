import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';

export default function RecyclingUsers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Users');

  // 1. STATE FOR REAL DATA
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH USERS FROM BACKEND
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await userService.getAllUsers();
        console.log("BACKEND RECYCLING USERS:", responseData); // X-RAY

        // The Ultimate Laravel Unwrapper
        let usersArray = [];
        if (Array.isArray(responseData)) usersArray = responseData;
        else if (Array.isArray(responseData?.data?.data)) usersArray = responseData.data.data;
        else if (Array.isArray(responseData?.data)) usersArray = responseData.data;
        else if (Array.isArray(responseData?.data?.users)) usersArray = responseData.data.users;
        else if (Array.isArray(responseData?.users)) usersArray = responseData.users;

        setUsers(usersArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load users:", error);
        toast.error("Failed to load users from server.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helpers for Status Colors
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active') return 'bg-teal-500/10 text-teal-500 dark:text-teal-400 border-teal-500/20';
    if (s === 'pending') return 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20';
    if (s === 'blocked' || s === 'suspended') return 'bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20';
    return 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20';
  };

  const getStatusDot = (status) => {
    const s = status?.toLowerCase();
    if (s === 'active') return 'bg-teal-500 dark:bg-teal-400';
    if (s === 'pending') return 'bg-amber-500';
    if (s === 'blocked' || s === 'suspended') return 'bg-red-500';
    return 'bg-slate-400';
  };

  // Safe Filter Logic
  const safeUsersArray = Array.isArray(users) ? users : [];
  const filteredUsers = safeUsersArray.filter(user => {
    if (activeTab === 'All Users') return true;
    if (activeTab === 'Pending') return user.status?.toLowerCase() === 'pending';
    
    // Map the tabs to backend roles
    const searchRole = activeTab.toLowerCase();
    const userRole = user.role?.toLowerCase() || '';
    
    if (searchRole.includes('admin')) return userRole.includes('admin');
    if (searchRole.includes('provider')) return userRole.includes('provider');
    if (searchRole.includes('standard')) return userRole === 'user' || userRole.includes('standard');
    
    return true;
  });

  const pendingCount = safeUsersArray.filter(u => u.status?.toLowerCase() === 'pending').length;

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar animate-in fade-in duration-300 bg-background-light dark:bg-[#0c1320]">
      <main className="w-full max-w-7xl mx-auto pt-4 pb-12 px-4 md:px-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg">Manage and verify all procurement platform users</p>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl border border-slate-200 dark:border-[#2d3a54] shadow-xl overflow-hidden relative min-h-[400px]">
          
          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#1a2235]/50 backdrop-blur-sm z-10">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          {/* TAB NAVIGATION */}
          <div className="border-b border-slate-200 dark:border-[#2d3a54] px-6 flex items-center gap-8 overflow-x-auto custom-scrollbar bg-slate-50 dark:bg-transparent">
            {['All Users', 'Administrators', 'Standard Users', 'Providers'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => setActiveTab('Pending')}
              className={`py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'Pending' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Pending Verification
              {pendingCount > 0 && (
                <span className="bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-500 text-xs px-2 py-0.5 rounded-full font-bold">{pendingCount}</span>
              )}
            </button>
          </div>

          {/* ACTION BAR */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-[#101622]/50">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-[#232a38] transition-colors flex items-center gap-2 text-slate-700 dark:text-white">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
              <button className="px-4 py-2 bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-[#232a38] transition-colors flex items-center gap-2 text-slate-700 dark:text-white">
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
            </div>
            <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person_add</span> Invite User
            </button>
          </div>

          {/* DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#101622]/80 border-y border-slate-200 dark:border-[#2d3a54] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden md:table-cell">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-[#2d3a54]">
                
                {!isLoading && filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}

                {filteredUsers.map((user) => {
                  const isSuspended = user.status?.toLowerCase() === 'blocked';
                  const isPending = user.status?.toLowerCase() === 'pending';

                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group ${isPending ? 'bg-amber-50 dark:bg-amber-500/5' : ''} ${isSuspended ? 'opacity-70 bg-slate-50 dark:bg-[#101622]/30' : ''}`}
                    >
                      
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-[#2d3a54] shrink-0 bg-slate-100 dark:bg-[#232a38] flex items-center justify-center text-slate-900 dark:text-white font-medium">
                            {user.image || user.profile_picture ? (
                              <img src={user.image || user.profile_picture} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              user.name?.substring(0, 2).toUpperCase() || "U"
                            )}
                          </div>
                          <div>
                            <div className={`font-bold text-sm cursor-pointer hover:text-primary transition-colors ${isSuspended ? 'text-slate-500 dark:text-white line-through decoration-slate-500' : 'text-slate-900 dark:text-white'}`} onClick={() => navigate(`/user-details/${user.id}`)}>
                              {user.name}
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 text-xs">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${user.role?.toLowerCase().includes('admin') ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 dark:bg-[#232a38] text-slate-700 dark:text-white border-slate-200 dark:border-[#2d3a54]'}`}>
                          {user.role || 'User'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(user.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(user.status)}`}></span>
                          {user.status}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 hidden md:table-cell">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {isPending ? (
                          <button 
                            onClick={() => navigate(`/user-details/${user.id}`)}
                            className="text-xs font-bold text-white px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 uppercase tracking-wider"
                          >
                            Review
                          </button>
                        ) : (
                          <button 
                            onClick={() => navigate(`/user-details/${user.id}`)}
                            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#232a38]"
                          >
                            View
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="p-4 border-t border-slate-200 dark:border-[#2d3a54] flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#101622]/50">
            <div>Showing <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length > 0 ? 1 : 0}</span> to <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredUsers.length}</span> entries</div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-[#2d3a54] hover:bg-slate-100 dark:hover:bg-[#232a38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white font-bold">1</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-[#2d3a54] hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-[#232a38] transition-colors dark:hover:text-white font-bold">2</button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-[#2d3a54] hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-[#232a38] transition-colors dark:hover:text-white">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}