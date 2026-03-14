import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function GeneralApp() {
  // THIS IS THE MAGIC SWITCH: 'map' or 'list'
  const [viewMode, setViewMode] = useState('map'); 
  const mapCenter = [30.278778, 31.473528]; // Egypt Coordinates

  return (
    <div className="flex flex-col gap-8 h-full">
      
      {/* --- METRICS BAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <div className="bg-card-dark border border-border-dark rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">person</span>
            </div>
            <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+12.4%</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold mt-1 text-white">45,230</h3>
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-bold">+5.1%</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Reports</p>
            <h3 className="text-3xl font-bold mt-1 text-white">128,402</h3>
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-slate-400 px-2 py-1 rounded text-xs font-bold">Current Month</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Resolution Rate</p>
            <h3 className="text-3xl font-bold mt-1 text-white">84.2%</h3>
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded text-xs font-bold">Elite</span>
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Community Points</p>
            <h3 className="text-3xl font-bold mt-1 text-white">1.2M+</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* --- MIDDLE SECTION (MAP OR LIST) --- */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-card-dark border border-border-dark rounded-3xl overflow-hidden flex flex-col h-[600px]">
            
            {/* Filter Bar & View Toggle */}
            <div className="p-4 border-b border-border-dark bg-background-dark/30 flex flex-wrap items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  {viewMode === 'map' ? 'map' : 'filter_list'}
                </span>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-white">
                  {viewMode === 'map' ? 'Geospatial Map' : 'Hotspot Locations'}
                </h4>
              </div>

              {/* TOGGLE BUTTONS */}
              <div className="flex items-center bg-background-dark rounded-lg p-1 border border-border-dark">
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'map' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Map View
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  List View
                </button>
              </div>
            </div>

            {/* CONDITIONAL RENDERING AREA */}
            <div className="relative flex-1 bg-slate-800 z-0 overflow-hidden">
              
              {/* IF VIEW MODE IS MAP */}
              {viewMode === 'map' && (
                <>
                  <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <Marker position={[30.278778, 31.473528]}>
                      <Popup className="text-slate-900 font-bold">Main HQ <br /> Active Sentinel Zone</Popup>
                    </Marker>
                    <Marker position={[30.0444, 31.2357]}>
                      <Popup className="text-slate-900 font-bold">Downtown Cairo <br /> 482 Active Reports</Popup>
                    </Marker>
                  </MapContainer>
                  
                  {/* Floating Map Stats */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none z-[1000]">
                    <div className="bg-background-dark/90 backdrop-blur p-3 rounded-xl border border-border-dark shadow-2xl">
                      <div className="flex items-center gap-2 mb-2"><div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div><span className="text-xs font-medium text-slate-300">Live Reports</span></div>
                      <p className="text-lg font-bold text-white">1,204</p>
                    </div>
                  </div>
                </>
              )}

              {/* IF VIEW MODE IS LIST */}
              {viewMode === 'list' && (
                <div className="h-full overflow-y-auto p-6 custom-scrollbar bg-background-dark/20">
                  <div className="flex flex-col gap-3">
                    
                    {/* List Item 1: Coastal Inlet */}
                    <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center gap-6 hover:border-primary/50 transition-all group">
                      <img alt="Coastal Inlet" className="h-12 w-16 rounded-lg object-cover opacity-70" src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&q=80&w=200"/>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h5 className="font-bold text-base text-white">Coastal Inlet</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-500 border border-red-500/50 uppercase tracking-wider">Critical</span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Sector A-12</p>
                      </div>
                      <div className="text-right px-6 border-x border-border-dark">
                        <p className="text-primary font-black text-xl">142</p>
                        <p className="text-[10px] text-slate-500 uppercase">Active Reports</p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                        View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                    {/* List Item 2: North Basin */}
                    <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center gap-6 hover:border-primary/50 transition-all group">
                      <img alt="North Basin" className="h-12 w-16 rounded-lg object-cover opacity-70" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=200"/>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h5 className="font-bold text-base text-white">North Basin</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/50 uppercase tracking-wider">Increasing</span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Sector B-04</p>
                      </div>
                      <div className="text-right px-6 border-x border-border-dark">
                        <p className="text-primary font-black text-xl">89</p>
                        <p className="text-[10px] text-slate-500 uppercase">Active Reports</p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                        View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                    {/* List Item 3: Industrial Zone */}
                    <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center gap-6 hover:border-primary/50 transition-all group">
                      <img alt="Industrial Zone" className="h-12 w-16 rounded-lg object-cover opacity-70" src="https://images.unsplash.com/photo-1518173946687-a4c8a07d7e02?auto=format&fit=crop&q=80&w=200"/>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h5 className="font-bold text-base text-white">Industrial Zone</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/50 uppercase tracking-wider">Increasing</span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Sector D-21</p>
                      </div>
                      <div className="text-right px-6 border-x border-border-dark">
                        <p className="text-primary font-black text-xl">76</p>
                        <p className="text-[10px] text-slate-500 uppercase">Active Reports</p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                        View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                    {/* List Item 4: South Harbor */}
                    <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center gap-6 hover:border-primary/50 transition-all group">
                      <img alt="South Harbor" className="h-12 w-16 rounded-lg object-cover opacity-70" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=200"/>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h5 className="font-bold text-base text-white">South Harbor</h5>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 uppercase tracking-wider">Stable</span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Sector S-02</p>
                      </div>
                      <div className="text-right px-6 border-x border-border-dark">
                        <p className="text-primary font-black text-xl">42</p>
                        <p className="text-[10px] text-slate-500 uppercase">Active Reports</p>
                      </div>
                      <button className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                        View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SCORING STANDING TABLE --- */}
        <div className="flex flex-col gap-6">
          <div className="bg-card-dark border border-border-dark rounded-3xl p-6 h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-primary">military_tech</span>
                Community Ranking
              </h3>
              <button className="text-xs text-primary font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
              
              {/* Rank 1 */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:border-primary/40 transition-all cursor-pointer">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className="text-2xl font-black text-amber-500">1</span>
                </div>
                <img alt="Sarah" className="h-10 w-10 rounded-full border-2 border-amber-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCqcM9gZG8E3vlgLXmwLmTEgOTuYVh3TI-ybmiIqlFCJo6VBXu5_xJphlgZ_-RzOD68EzgheOxBRKCeuIQk8_ybY_51BbI7P1zMLSXbHWqfD2QXvDpeA7yMOvPFtF3rlrye71zCFie-CeS10zH68ujJax8c3-q6V9G5xgQM3CE_sZoWXkJOoqoDIroLwzsBRZjxfE3-bP6Fo1RTZdHMnR6yscU_hu6jeYvv29nZMfPipoRZnb8hEW6Yte24kqLe3mHcAwkk5JhuQ"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">Sarah Jenkins</p>
                  <p className="text-xs text-slate-400">Level 48 • Guardian</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">12,450</p>
                  <p className="text-[10px] uppercase text-slate-500">PTS</p>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border-dark hover:border-primary/40 transition-all cursor-pointer">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className="text-xl font-bold text-slate-300">2</span>
                </div>
                <img alt="Mike" className="h-10 w-10 rounded-full border-2 border-slate-400" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB83Ku0CxHJ1iPgGFgZa96felrZCrzeV-7V8W8Oot3978QE9hot80MBviMbHkZB2kiOQKt7TRimFybay8ADn0XUIz_6QBybp1iYPI6ZX7fcnuRUE3usYa_FHGLorktz_xy52b2-t1b1wPiBzpEAwwG9qkPnJd-VBPF7BmmOJqgYYuR_yqyTy7fRv9QwlcBfqQCOC7fgKE6OQXzIJytJaut3eTXLuD_XHFSlYD9ePEs6HdbNzHFQ7E8MyzsPZWm13SWF7_1XE9rZXA"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">Michael Chen</p>
                  <p className="text-xs text-slate-400">Level 42 • Scout</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-300">9,820</p>
                  <p className="text-[10px] uppercase text-slate-500">PTS</p>
                </div>
              </div>

              {/* Rank 3 */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border-dark hover:border-primary/40 transition-all cursor-pointer">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className="text-xl font-bold text-amber-700">3</span>
                </div>
                <img alt="Elena" className="h-10 w-10 rounded-full border-2 border-amber-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_TVD1b35DScUuKLLbR373K-1ntWr6mr7iiMtLaaRdsn9M1PWj8BYm7Dy2l2I1eO7MaJZ685xm53DrSYoFpnMd8xD_o53C5xLykA7QvL0Kndo5SBpviHUUrSTRStusqJUtN4r_ZO4TwraqH2XaOELcaE5s4SvpspJ7VXbmsdnlKDyAteqCkG3U-kzKPegE-WJcdAowrDaxanzSgjUp_AzaeAKTdeMBYQB24Q2oWo7Erdn9iK5whvz46mqyBNrvjOvUuUS9BPv2RQ"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">Elena Rodriguez</p>
                  <p className="text-xs text-slate-400">Level 41 • Scout</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-300">8,740</p>
                  <p className="text-[10px] uppercase text-slate-500">PTS</p>
                </div>
              </div>

              {/* Rank 4 */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-border-dark transition-all cursor-pointer">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className="text-lg font-medium text-slate-500">4</span>
                </div>
                <img alt="David" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAV-DRGxvfnk3oYPZwoKjc6xPxF6PZBsPOlYoc5-3ZMAT7WWhG8wOQno5Worzxb29ghY_LKpRW-g7xnrU1VxYdRyqRhXk4kfg6tIWRDRcxUyLO9CDDFbsJVPsdsH0YLfwEjl2Z68wA8R8Wq0ODYf8g7XSC4lLTzga55xM0SP2fd_PtOTswgRZISehHGuN0w30fU_CkAT25Wa7ln5jnmU8U62_5QyVLh1Todlq48GgvAIYOpLvrup0RYQs_RAkiRndxP9byI-1v9A"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">David Wilson</p>
                  <p className="text-xs text-slate-400">Level 35 • Member</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-400">7,210</p>
                  <p className="text-[10px] uppercase text-slate-500">PTS</p>
                </div>
              </div>

              {/* Rank 5 */}
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-border-dark transition-all cursor-pointer">
                <div className="flex-shrink-0 flex items-center justify-center w-8">
                  <span className="text-lg font-medium text-slate-500">5</span>
                </div>
                <img alt="Sasha" className="h-10 w-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4CIvfZLMotsOr7dhD2NpBOGOJjyJ0Q8bXR4HwWxYiGB53TxBNocZFsh9cSAbqy9TIjng83i760Nsl6Y8HShIqZlea-1kYsYx6SsqlsiLpvkiDCW1ICwYnBzTCn1Ww5MWl4rL8XGT7Rrox2ADxzN74Eju9IQxSJVzfo26_-BaQJah6bu_7myt6ygxVxIUVr9EGP6DOUVMNQSw9wjtRLLwgQT01J-SpwNxf_9at2D5obqTSU19wPNb-qbv4hxWxOoZXRu7SEEonHg"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">Alex Kim</p>
                  <p className="text-xs text-slate-400">Level 33 • Member</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-400">6,550</p>
                  <p className="text-[10px] uppercase text-slate-500">PTS</p>
                </div>
              </div>

            </div>
            
            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-border-dark">
              <button className="w-full py-3 bg-background-dark border border-border-dark rounded-xl font-bold text-sm text-white hover:bg-primary/10 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">emoji_events</span>
                Season Leaderboard Details
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- BOTTOM SUMMARY ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pb-8 shrink-0">
        
        <div className="bg-card-dark border border-border-dark rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Waste Type Distribution</h3>
            <span className="material-symbols-outlined text-slate-500">more_horiz</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Plastic Waste</span>
                <span className="font-bold text-white">62%</span>
              </div>
              <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[62%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Organic Waste</span>
                <span className="font-bold text-white">24%</span>
              </div>
              <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[24%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Hazardous / Electronic</span>
                <span className="font-bold text-white">14%</span>
              </div>
              <div className="w-full bg-background-dark h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[14%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card-dark border border-border-dark rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Quick Analysis</h3>
            <span className="material-symbols-outlined text-slate-500">analytics</span>
          </div>
          <div className="flex items-center gap-6 h-full pb-4">
            <div className="flex-1 flex flex-col items-center justify-center border-r border-border-dark">
              <p className="text-primary text-3xl font-black">4.2m</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">kilogrames Collected</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-emerald-500 text-3xl font-black">98.2%</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Report Accuracy</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}