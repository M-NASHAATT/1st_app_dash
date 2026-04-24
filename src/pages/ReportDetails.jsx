import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import toast from 'react-hot-toast';
import { reportService } from '../services/reportService';

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for Admin Actions
  const [status, setStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const responseData = await reportService.getReportById(id);
        console.log("SINGLE REPORT DATA:", responseData);
        
        // Unwrap Laravel data safely
        const data = responseData?.data?.report || responseData?.data || responseData;
        setReport(data);
        setStatus(data.status || 'pending');
        setAdminNote(data.admin_note || '');
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch report:", error);
        toast.error("Failed to load report details.");
        setIsLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleUpdateStatus = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating report...");
    try {
      await reportService.updateStatus(id, status, adminNote);
      
      // Update local UI state
      setReport({ ...report, status: status, admin_note: adminNote });
      
      toast.success(`Report marked as ${status}!`, { id: toastId });
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update report.", { id: toastId });
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (s) => {
    const stat = s?.toLowerCase();
    if (stat === "accepted") return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (stat === "pending") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    if (stat === "rejected") return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
        <span className="material-symbols-outlined text-4xl">search_off</span>
        <h2>Report not found</h2>
        <button onClick={() => navigate('/reports')} className="text-primary hover:underline">Back to Reports</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div>
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <Link to="/reports" className="hover:text-primary transition-colors">Reports</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-slate-900 dark:text-white font-medium">Details</span>
            </nav>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {report.report_id || `Report #${report.id}`}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              Submitted on {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
          <button onClick={() => navigate('/reports')} className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2d3a54] text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-[#1a2235] transition-colors">
            Back to List
          </button>
        </div>

        {/* --- SPLIT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Photo & Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Evidence Photo */}
            <div className="bg-white dark:bg-[#1a2235] rounded-2xl border border-slate-200 dark:border-[#2d3a54] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-[#2d3a54] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">photo_camera</span>
                <h3 className="font-bold text-slate-900 dark:text-white">Evidence Photo</h3>
              </div>
              <div className="w-full h-[400px] bg-slate-100 dark:bg-[#0c1320] flex items-center justify-center relative group">
                {report.image ? (
                  <img src={report.image} alt="Waste Evidence" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-slate-400">image_not_supported</span>
                )}
              </div>
            </div>

            {/* Description & User Info */}
            <div className="bg-white dark:bg-[#1a2235] rounded-2xl border border-slate-200 dark:border-[#2d3a54] p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Report Details</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50 dark:bg-[#101622] p-4 rounded-xl border border-slate-100 dark:border-[#2d3a54]">
                {report.description || "No description provided by the user."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#2d3a54]">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Potential Reward</p>
                  <p className="text-xl font-black text-primary">+{report.points || 0} PTS</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-[#2d3a54]">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">AI Classification</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {report.waste_type || "Unclassified Waste"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Map & Admin Actions */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Admin Action Box */}
            <div className="bg-white/80 dark:bg-[#1a2235]/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-[#2d3a54] p-6 shadow-xl lg:sticky lg:top-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                Admin Review
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Status</label>
                  <div className="relative">
                    <select 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#101622] text-slate-900 dark:text-white border border-slate-200 dark:border-[#2d3a54] rounded-xl h-12 pl-4 pr-10 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer outline-none"
                    >
                      <option value="pending">Pending Review</option>
                      <option value="accepted">Accept & Award Points</option>
                      <option value="rejected">Reject Report</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Note</label>
                  <textarea 
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Provide a reason for rejection, or a note for the user..."
                    className="w-full bg-slate-50 dark:bg-[#101622] text-slate-900 dark:text-white border border-slate-200 dark:border-[#2d3a54] rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[100px] outline-none"
                  ></textarea>
                </div>

                <button 
                  onClick={handleUpdateStatus}
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Confirm & Save"}
                </button>
              </div>
            </div>

            {/* Mini Map */}
            <div className="bg-white dark:bg-[#1a2235] rounded-2xl border border-slate-200 dark:border-[#2d3a54] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-[#2d3a54] flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pin_drop</span>
                <h3 className="font-bold text-slate-900 dark:text-white">Location</h3>
              </div>
              <div className="h-[250px] w-full bg-slate-100 dark:bg-[#0c1320] relative">
                {report.lat && report.lng ? (
                  <MapContainer 
                    center={[parseFloat(report.lat), parseFloat(report.lng)]} 
                    zoom={15} 
                    scrollWheelZoom={false} 
                    style={{ height: '100%', width: '100%' }} 
                    zoomControl={false}
                  >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <Marker position={[parseFloat(report.lat), parseFloat(report.lng)]}>
                      <Popup>{report.location_text}</Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-3xl mb-2">location_off</span>
                    <p className="text-sm font-medium">No GPS data provided</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#101622]/50">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{report.location_text || "Unknown Location"}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">{report.lat}, {report.lng}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}