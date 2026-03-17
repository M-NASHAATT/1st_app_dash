import { useState } from 'react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('All Reports');

  const [reports, setReports] = useState([
    { id: "REP-90241", wasteType: "Polyethylene (HDPE)", location: "Sector 7G", date: "Oct 24, 2023", time: "14:20:05", status: "AI Verified", image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&q=80&w=200" },
    { id: "REP-90242", wasteType: "Chemical Waste", location: "North Basin", date: "Oct 24, 2023", time: "13:45:12", status: "Pending Review", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=200" },
    { id: "REP-90243", wasteType: "Rusted Iron Scraps", location: "East Shoreline", date: "Oct 23, 2023", time: "09:15:33", status: "Flagged", image: "https://images.unsplash.com/photo-1518173946687-a4c8a07d7e02?auto=format&fit=crop&q=80&w=200" },
    { id: "REP-90244", wasteType: "Algal Bloom", location: "South Jetty", date: "Oct 22, 2023", time: "11:30:58", status: "Cleaned", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=200" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReports(reports.map(report => report.id === id ? { ...report, status: newStatus } : report));
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "AI Verified": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Pending Review": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Flagged": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "Cleaned": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  // FILTER THE REPORTS BASED ON THE ACTIVE TAB
  const filteredReports = reports.filter(report => {
    if (activeTab === 'All Reports') return true;
    return report.status === activeTab;
  });

  return (
    <div className="flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Reports Center</h2>
          <p className="text-slate-500 dark:text-[#92a4c9] mt-2 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            1,248 active waste reports monitored
          </p>
        </div>
        {/* HIDDEN: Date Range and Export Buttons */}
      </div>

      {/* FILTER TABS */}
      <div className="flex border-b border-primary/10 dark:border-[#232f48]">
        {['All Reports', 'Pending Review', 'AI Verified', 'Flagged', 'Cleaned'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#151921] rounded-xl border border-primary/10 dark:border-[#232f48] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-50 dark:bg-[#192233] border-b border-primary/10 dark:border-[#232f48]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest w-20">Preview</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Report ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Status</th>
                {/* HIDDEN: Actions Column */}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5 dark:divide-[#232f48]">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="size-12 rounded-lg bg-cover bg-center border border-primary/10 dark:border-[#232f48]" style={{ backgroundImage: `url('${report.image}')` }}></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col"><span className="text-slate-900 dark:text-white font-bold text-sm font-mono">{report.id}</span><span className="text-[10px] text-slate-500 dark:text-[#92a4c9] font-medium uppercase tracking-tighter">{report.wasteType}</span></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm"><span className="material-symbols-outlined text-sm text-primary">location_on</span>{report.location}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col"><span className="text-slate-900 dark:text-white text-sm">{report.date}</span><span className="text-[10px] text-slate-500 font-bold">{report.time}</span></div>
                  </td>
                  
                  {/* STATUS DROPDOWN */}
                  <td className="px-6 py-5">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer appearance-none text-center ${getStatusStyles(report.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      <option value="AI Verified" className="text-slate-900 bg-white">AI Verified</option>
                      <option value="Pending Review" className="text-slate-900 bg-white">Pending Review</option>
                      <option value="Flagged" className="text-slate-900 bg-white">Flagged</option>
                      <option value="Cleaned" className="text-slate-900 bg-white">Cleaned</option>
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