import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import toast from 'react-hot-toast';
import { userService } from '../services/userService';

export default function GeneralApp() {
  const [viewMode, setViewMode] = useState('map'); 
  const mapCenter = [30.278778, 31.473528]; // Egypt Coordinates

  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const responseData = await userService.getOverview();
        console.log("BACKEND OVERVIEW RESPONSE:", responseData); // X-RAY

        // Extract the 'data' object safely
        const actualData = responseData?.data || {};
        
        setOverviewData(actualData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load overview:", error);
        toast.error("Failed to load dashboard metrics.");
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback objects so we NEVER crash if backend is missing data
  const metrics = overviewData?.metrics || {};
  const liveReports = Array.isArray(overviewData?.live_reports) ? overviewData.live_reports : [];
  const ranking = Array.isArray(overviewData?.community_ranking) ? overviewData.community_ranking : [];
  const wasteDistribution = overviewData?.waste_distribution || { plastic: 0, organic: 0, hazardous: 0 };

  return (
    <div className="flex flex-col gap-8 h-full p-8">
      
      {/* --- METRICS BAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><span className="material-symbols-outlined">person</span></div>
            <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">Live</span>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{metrics.total_users || 0}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500"><span className="material-symbols-outlined">description</span></div>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Reports</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{metrics.total_reports || 0}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500"><span className="material-symbols-outlined">task_alt</span></div>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Resolution Rate</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{metrics.resolution_rate || 0}%</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500"><span className="material-symbols-outlined">workspace_premium</span></div>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Community Points</p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{metrics.community_points || 0}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* --- MIDDLE SECTION (MAP OR LIST) --- */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-sm">
            
            <div className="p-4 border-b border-slate-200 dark:border-[#2d3a54] bg-slate-50 dark:bg-[#101622]/30 flex flex-wrap items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">{viewMode === 'map' ? 'map' : 'filter_list'}</span>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                  {viewMode === 'map' ? 'Geospatial Map' : 'Hotspot Locations'}
                </h4>
              </div>

              <div className="flex items-center bg-slate-100 dark:bg-[#101622] rounded-lg p-1 border border-slate-200 dark:border-[#2d3a54]">
                <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'map' ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Map View</button>
                <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>List View</button>
              </div>
            </div>

            <div className="relative flex-1 bg-slate-100 dark:bg-slate-800 z-0 overflow-hidden">
              
              {viewMode === 'map' && (
                <>
                  <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    
                    {/* DYNAMIC MARKERS FROM BACKEND */}
                    {liveReports.map((report, i) => (
                      <Marker key={i} position={[parseFloat(report.lat), parseFloat(report.lng)]}>
                        <Popup className="text-slate-900 font-bold">
                          {report.location_text || "Unknown Location"} <br /> 
                          <span className="capitalize">Status: {report.status}</span>
                        </Popup>
                      </Marker>
                    ))}
                    
                  </MapContainer>
                  
                  <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none z-[1000]">
                    <div className="bg-white/90 dark:bg-[#101622]/90 backdrop-blur p-3 rounded-xl border border-slate-200 dark:border-[#2d3a54] shadow-xl">
                      <div className="flex items-center gap-2 mb-2"><div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div><span className="text-xs font-medium text-slate-600 dark:text-slate-300">Live Reports</span></div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{liveReports.length}</p>
                    </div>
                  </div>
                </>
              )}

              {viewMode === 'list' && (
                <div className="h-full overflow-y-auto p-6 custom-scrollbar bg-slate-50 dark:bg-[#101622]/20">
                  <div className="flex flex-col gap-3">
                    
                    {/* DYNAMIC LIST FROM BACKEND */}
                    {liveReports.map((report, i) => (
                      <div key={i} className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-4 flex items-center gap-6 shadow-sm">
                        <div className="flex-1">
                          <h5 className="font-bold text-base text-slate-900 dark:text-white">{report.location_text || "Unknown Location"}</h5>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Lat: {report.lat}</p>
                        </div>
                        <div className="text-right px-6">
                          <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${report.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : report.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {liveReports.length === 0 && (
                      <p className="text-slate-500 text-center pt-10">No live reports available.</p>
                    )}

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SCORING STANDING TABLE --- */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-6 h-[600px] flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">military_tech</span> Community Ranking
              </h3>
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
              
              {/* DYNAMIC LEADERBOARD FROM BACKEND */}
              {ranking.map((user, i) => (
                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 transition-all cursor-pointer">
                  <div className="flex-shrink-0 flex items-center justify-center w-8"><span className="text-2xl font-black text-amber-500">{user.rank}</span></div>
                  <img alt={user.name} className="h-10 w-10 rounded-full border-2 border-amber-500 object-cover bg-white" src={user.image || "https://i.pravatar.cc/150"}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.level || "Member"}</p>
                  </div>
                  <div className="text-right"><p className="text-sm font-black text-primary">{user.points}</p><p className="text-[10px] uppercase text-slate-500">PTS</p></div>
                </div>
              ))}

              {ranking.length === 0 && (
                <p className="text-slate-500 text-center pt-10">No leaderboard data available.</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}