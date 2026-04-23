import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { reportService } from '../services/reportService';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('All Reports');
  
  // 1. REAL STATE
  const [reports, setReports] = useState([]);
  const [metrics, setMetrics] = useState({}); // To hold the 'total_active_monitored' stat!
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH REPORTS ON LOAD
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const responseData = await reportService.getAllReports();
        console.log("BACKEND REPORTS RESPONSE:", responseData); // X-RAY

        // Save the metrics if they exist
        if (responseData?.data?.total_active_monitored !== undefined) {
          setMetrics({ total_active: responseData.data.total_active_monitored });
        }

        // THE ULTIMATE LARAVEL UNWRAPPER (Updated for this specific JSON)
        let reportsArray = [];
        if (Array.isArray(responseData?.data?.reports?.data)) {
          reportsArray = responseData.data.reports.data; // Matches their exact JSON structure!
        } else if (Array.isArray(responseData?.data?.reports)) {
          reportsArray = responseData.data.reports;
        } else if (Array.isArray(responseData?.data?.data)) {
          reportsArray = responseData.data.data;
        } else if (Array.isArray(responseData?.data)) {
          reportsArray = responseData.data;
        }

        setReports(reportsArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load reports:", error);
        toast.error("Failed to load reports from server.");
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // 3. HANDLE STATUS CHANGE (PUT REQUEST)
  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI Update
    setReports(reports.map(report => report.id === id ? { ...report, status: newStatus } : report));

    try {
      await reportService.updateStatus(id, newStatus);
      toast.success(`Report marked as ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Could not save status to server.");
    }
  };

  // UI Helper for Badge Colors
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    if (s === "accepted") return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (s === "pending") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (s === "rejected") return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  };

  // ULTRA-SAFE FILTER
  const safeReportsArray = Array.isArray(reports) ? reports : [];
  
  const filteredReports = safeReportsArray.filter(report => {
    if (activeTab === 'All Reports') return true;
    return report.status?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark p-6 lg:p-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Reports Center</h2>
          <p className="text-slate-500 dark:text-[#92a4c9] mt-2 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {/* Using the real metric from the backend! */}
            {metrics.total_active || 0} active waste reports monitored across all sectors
          </p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex border-b border-primary/10 dark:border-[#232f48]  custom-scrollbar">
        {['All Reports', 'pending', 'accepted', 'rejected'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize transition-colors whitespace-nowrap ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#151921] rounded-xl border border-primary/10 dark:border-[#232f48] overflow-hidden min-h-[400px] relative shadow-sm">
        
        {/* LOADING SPINNER */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#151921]/50 backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-50 dark:bg-[#192233] border-b border-primary/10 dark:border-[#232f48]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest w-20">Preview</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Report ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5 dark:divide-[#232f48]">
              
              {!isLoading && filteredReports.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    No reports found in this category.
                  </td>
                </tr>
              )}

              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-primary/5 transition-colors group">
                  
                  {/* Image Preview */}
                  <td className="px-6 py-5">
                    <div 
                      className="size-12 rounded-lg bg-cover bg-center border border-primary/10 dark:border-[#232f48]" 
                      style={{ backgroundImage: `url('${report.image || "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=200"}')` }}
                    ></div>
                  </td>
                  
                  {/* ID & Description */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-bold text-sm font-mono">{report.report_id}</span>
                      <span className="text-[10px] text-slate-500 dark:text-[#92a4c9] font-medium uppercase tracking-tighter truncate max-w-[150px]">
                        {report.description || "Environmental Report"}
                      </span>
                    </div>
                  </td>
                  
                  {/* Location & Points */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                        {report.location_text || "Unknown"}
                      </span>
                      <span className="text-[10px] text-primary font-bold mt-1">+{report.points} PTS</span>
                    </div>
                  </td>
                  
                  {/* Date & Note */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white text-sm">
                        {report.created_at ? new Date(report.created_at).toLocaleDateString() : "N/A"}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold truncate max-w-[150px]" title={report.admin_note}>
                        {report.admin_note || "No notes"}
                      </span>
                    </div>
                  </td>
                  
                  {/* STATUS DROPDOWN */}
                  <td className="px-6 py-5 text-center">
                    <select
                      value={report.status?.toLowerCase()}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer appearance-none text-center ${getStatusStyles(report.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      <option value="pending" className="text-slate-900 bg-white">Pending</option>
                      <option value="accepted" className="text-slate-900 bg-white">Accepted</option>
                      <option value="rejected" className="text-slate-900 bg-white">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}