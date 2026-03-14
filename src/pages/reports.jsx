import { useState } from 'react';

export default function Reports() {
  // 1. DATA ARRAY (Simulating a database)
  const [reports, setReports] = useState([
    {
      id: "REP-90241",
      wasteType: "Polyethylene (HDPE)",
      category: "Plastic Debris",
      location: "Sector 7G - Coastal Inlet",
      date: "Oct 24, 2023",
      time: "14:20:05 UTC",
      status: "AI Verified",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIv41O8qvd_Sf6qKmNAcKbz66Gfxj8ECDFGJPHtNqHjwBtCU2YJkaG38W50u37FRiL8PsA5y9WUiRaQEpAdyOgZj4g-8Na5BlLEiPFiEVhr5mzCF-3ObHVf7ackF1nPUW-nIW7ePIlc9v0Ne9CNN9znZAuvsgjZ7hpfHGclolTRZlXPjPsd0BXrp_PlccJvuD--X5MFCMOXrwVTlwNznxmh-u8J2k6mt4aCfjjnku6BogkcxJIo_ucF9MwLQ9KLzVIa8kGy8PnmQ"
    },
    {
      id: "REP-90242",
      wasteType: "Chemical Waste",
      category: "Hazardous",
      location: "North Basin - Zone 2",
      date: "Oct 24, 2023",
      time: "13:45:12 UTC",
      status: "Pending",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2zl9h2Lh7c2axf2L0m9FPg1B27WX_TL4PtKoCIUXNIXmIKvCm-qvdaRO2Lc2ggcaX4lB2gvBgryXMrQtMjcV6PTjIT4y7ahKpyzMe_86fK8epQ1MAgy6kTH1Ek6-cph8nLaXVlh5X9k2HeNuJL2XUbPosw4PV4wnaPNCN7anmJd3aEXUSyQPiVfArCnsmfdr2jViMtfRxc2gmQZdQ3tq3RiHh6LnYDhd0sYJ1Ugax43FrELQ0HKkuS6dZPa8rU6NEtIecWK6XNg"
    },
    {
      id: "REP-90243",
      wasteType: "Rusted Iron Scraps",
      category: "Metals",
      location: "East Shoreline",
      date: "Oct 23, 2023",
      time: "09:15:33 UTC",
      status: "Flagged",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdpDA3vuNETLqe32UjWyHJEFezxGAmaJbLcdf96z8Ilz1by_cjdvDmisipqc0sp6_pomIcd29nG9G-m9f072LvoyJmEm1LXlYPKiM_S5oHhq7IVgLIfQ26pUuS6dJoluG0DQzZknfKTvi184aWLizBtIXHT43XRgiuqTAZL9cuj0PesG6Z_jEooHqEeaItqjtGn7ikWW5-y-s-jWfM_FxujXp56slU8CdTqy2hnVJcC4CGtSSvNs_c2AnZD0RBnSegKbZI2-psxA"
    },
    {
      id: "REP-90244",
      wasteType: "Algal Bloom",
      category: "Biological",
      location: "South Jetty",
      date: "Oct 22, 2023",
      time: "11:30:58 UTC",
      status: "Cleaned",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrOid0mpXZUTyd3ujjtaJfJulCjvIYOsWcDUb3VwMZlYlhhXZYohrkbHTzPSHYxTkpXnbaqWINB-MgQUQSv9yitF_jjkaci9U3yYFx88MxcG2ryE5LTLTq4YjP9qYzKC5nF9vM0r2XzQM-g_xR3fcYGTYuKcxvaovRNm3veOaMtF07QtvZd2hYFvn9fN_tWna3Qdka3hlaLa9nwFaDXI6bMulaiG78YdwR4w0qxzcWBINxMlOZY_5QqL4AeYCUWNJKJu6UaZtixg"
    }
  ]);

  // 2. HELPER TO UPDATE STATUS
  const handleStatusChange = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  // 3. HELPER FOR DYNAMIC COLORS
  const getStatusStyles = (status) => {
    switch (status) {
      case "AI Verified": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Pending": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Flagged": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "Cleaned": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Reports Center</h2>
          <p className="text-slate-500 dark:text-[#92a4c9] mt-2 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            1,248 active waste reports monitored across all sectors
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#232f48] text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#2c3b5a] transition-colors border border-slate-200 dark:border-[#324467]">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg text-white">download</span>
            Export CSV
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-primary/10 dark:border-[#232f48] mb-6">
        <button className="px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary">All Reports</button>
        <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pending Review</button>
        <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">AI Verified</button>
        <button className="px-6 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Flagged</button>
      </div>

      {/* TABLE AREA */}
      <div className="flex-1 bg-white dark:bg-[#151921] rounded-xl border border-primary/10 dark:border-[#232f48] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            
            <thead className="sticky top-0 bg-slate-50 dark:bg-[#192233] z-10 border-b border-primary/10 dark:border-[#232f48]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest w-20">Preview</th>
                {/* REQUIREMENT 1: Changed to Report ID */}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Report ID</th>
                {/* REQUIREMENT 2: AI Confidence Column Removed */}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Timestamp</th>
                {/* REQUIREMENT 3: Status Column */}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-[#92a4c9] uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-primary/5 dark:divide-[#232f48]">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-primary/5 transition-colors group">
                  
                  <td className="px-6 py-5">
                    <div 
                      className="size-12 rounded-lg bg-cover bg-center border border-primary/10 dark:border-[#232f48] group-hover:border-primary transition-colors cursor-zoom-in" 
                      style={{ backgroundImage: `url('${report.image}')` }}
                    ></div>
                  </td>
                  
                  {/* REQUIREMENT 1: Showing ID as main text, and Type as subtext */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-bold text-sm font-mono">{report.id}</span>
                      <span className="text-[10px] text-slate-500 dark:text-[#92a4c9] font-medium uppercase tracking-tighter">
                        {report.wasteType}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      {report.location}
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white text-sm">{report.date}</span>
                      <span className="text-[10px] text-slate-500 font-bold">{report.time}</span>
                    </div>
                  </td>
                  
                  {/* REQUIREMENT 3: Editable Status Dropdown */}
                  <td className="px-6 py-5">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer appearance-none text-center ${getStatusStyles(report.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      <option value="Pending" className="text-slate-900 bg-white">Pending</option>
                      <option value="AI Verified" className="text-slate-900 bg-white">AI Verified</option>
                      <option value="Flagged" className="text-slate-900 bg-white">Flagged</option>
                      <option value="Cleaned" className="text-slate-900 bg-white">Cleaned</option>
                    </select>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-primary/20 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-[#232f48] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
        
        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#192233] border-t border-primary/10 dark:border-[#232f48] flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="text-slate-900 dark:text-white font-bold">1-4</span> of <span className="text-slate-900 dark:text-white font-bold">1,248</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-primary/10 dark:border-[#232f48] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#232f48] transition-colors disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm font-bold">1</button>
            <button className="px-3 py-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#232f48] text-sm font-medium">2</button>
            <button className="p-2 rounded-lg border border-primary/10 dark:border-[#232f48] text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#232f48] transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}