import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';

export default function UserDetails() {
  const { id } = useParams(); 
  
  const [activeTab, setActiveTab] = useState('recent');
  
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await userService.getUserDetails(id);
        
        // 1. THE UNWRAPPER: Based on the JSON they sent, the data is in data.user!
        const actualData = responseData?.data?.user || responseData?.user;
        
        setUserData(actualData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load user details:", error);
        toast.error("Failed to load user profile.");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
        <span className="material-symbols-outlined text-4xl">person_off</span>
        <h2>User not found</h2>
        <Link to="/users" className="text-primary hover:underline">Return to User List</Link>
      </div>
    );
  }

  // Check if this profile is a normal user or a company provider
  const isProvider = userData.role === 'provider';

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 h-full">
      
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/users" className="hover:text-primary transition-colors">User Management</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">{userData.name}</span>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#1a2233] rounded-xl p-6 border border-slate-200 dark:border-[#2d3748] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              {/* Uses 'image' from the backend JSON! */}
              <img 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-primary/20 object-cover bg-slate-100" 
                src={userData.image || "https://i.pravatar.cc/150"}
              />
              <span className={`absolute bottom-1 right-1 w-5 h-5 border-2 border-white dark:border-[#1a2233] rounded-full ${userData.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {userData.name}
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                  {userData.role}
                </span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                User ID: <span className="text-primary font-mono font-medium">#{userData.user_id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE DATA CARDS */}
      <div className={`grid grid-cols-1 ${!isProvider ? 'lg:grid-cols-2' : ''} gap-8 shrink-0`}>
        
        {/* Personal Information (Adapts for User vs Provider!) */}
        <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-[#2d3748] overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3748] bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">{isProvider ? 'domain' : 'person'}</span> 
              {isProvider ? 'Company Information' : 'Personal Information'}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Email Address</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{userData.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Phone Number</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{userData.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Address</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{userData.address || "N/A"}</p>
            </div>

            {/* DYNAMIC FIELDS BASED ON ROLE */}
            {isProvider ? (
              <>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Tax ID</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 font-mono">{userData.tax_id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Company Document</p>
                  {userData.company_document ? (
                    <a href={userData.company_document} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">open_in_new</span> View Document
                    </a>
                  ) : <p className="text-sm">N/A</p>}
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">National ID</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200 font-mono">{userData.national_id || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Date of Birth</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{userData.date_of_birth || "N/A"}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Impact Summary (ONLY SHOWS FOR USERS, NOT PROVIDERS!) */}
        {!isProvider && (
          <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-[#2d3748] overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-[#2d3748] bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500">auto_awesome</span> Impact Summary
              </h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-[#101622] p-4 rounded-lg border border-slate-200 dark:border-[#2d3a54]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Reports Submitted</p>
                <p className="text-2xl font-bold text-primary">{userData.reports_count}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#101622] p-4 rounded-lg border border-slate-200 dark:border-[#2d3a54]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-500">{userData.accuracy_rate}%</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#101622] p-4 rounded-lg border border-slate-200 dark:border-[#2d3a54]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Total Points</p>
                <p className="text-2xl font-bold text-amber-500">{userData.points}</p>
              </div>
              <div className="bg-slate-50 dark:bg-[#101622] p-4 rounded-lg border border-slate-200 dark:border-[#2d3a54]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Guardian Rank</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{userData.level}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- TABS SECTION (ONLY FOR USERS) --- */}
      {!isProvider && (
        <div className="flex-1 pb-8">
          <div className="flex border-b border-slate-200 dark:border-[#2d3748] mb-6 overflow-x-auto no-scrollbar">
            <button onClick={() => setActiveTab('recent')} className={`px-6 py-3 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'recent' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              Recent Reports
            </button>
            <button onClick={() => setActiveTab('rewards')} className={`px-6 py-3 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'rewards' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              Reward History
            </button>
          </div>

          {/* RECENT REPORTS TAB */}
          {activeTab === 'recent' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {userData.reports?.length === 0 ? (
                <p className="text-slate-500 col-span-full">No reports submitted yet.</p>
              ) : (
                userData.reports?.map(report => (
                  <div key={report.id} className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-[#2d3748] overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                    <div className="h-40 relative">
                      <img alt="Waste Report" className="w-full h-full object-cover" src={report.image || "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400"}/>
                      <span className="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase">{report.status}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{report.report_id}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(report.created_at).toLocaleDateString()}</span>
                      </div>
                      {/* <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{report.description || "No description provided."}</p> */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-primary">location_on</span><span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{report.location_text}</span></div>
                        <span className="text-[10px] font-bold text-primary">+{report.points} PTS</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* REWARD HISTORY TAB */}
          {activeTab === 'rewards' && (
            <div className="bg-white dark:bg-[#1a2233] rounded-xl border border-slate-200 dark:border-[#2d3748] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-[#101622] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-[#2d3748]">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-[#2d3748]">
                    {userData.reward_history?.length === 0 ? (
                      <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No rewards history found.</td></tr>
                    ) : (
                      userData.reward_history?.map(history => (
                        <tr key={history.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{new Date(history.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{history.title}</td>
                          <td className={`px-6 py-4 text-sm font-bold text-right ${history.type === 'earned' ? 'text-emerald-500' : 'text-orange-500'}`}>
                            {history.type === 'earned' ? '+' : ''}{history.points}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}