import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/recyclingService'; // IMPORT API

export default function RecyclingOrders() {
  const navigate = useNavigate();

  // 1. STATE FOR REAL DATA
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH THE ORDERS
  // 2. FETCH THE ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await recyclingService.getAllOrders();
        console.log("BACKEND ORDERS RESPONSE:", responseData); // X-RAY

        // THE ULTIMATE LARAVEL UNWRAPPER (Updated for orders.result)
        let ordersArray = [];
        
        if (Array.isArray(responseData?.data?.orders?.result)) {
          ordersArray = responseData.data.orders.result; 
        } else if (Array.isArray(responseData?.orders?.result)) {
          ordersArray = responseData.orders.result; 
        } else if (Array.isArray(responseData?.data?.result)) {
          ordersArray = responseData.data.result;
        } else if (Array.isArray(responseData?.data?.data)) {
          ordersArray = responseData.data.data;
        }

        setOrders(ordersArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load orders:", error);
        toast.error("Failed to load orders from server.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 3. HELPER FUNCTIONS FOR STATUS COLORS
  const getStatusColor = (s) => {
    const stat = s?.toLowerCase();
    if (stat === "delivered" || stat === "confirmed") return "emerald";
    if (stat === "in_transit" || stat === "carrier_assigned") return "amber";
    if (stat === "cancelled") return "red";
    return "blue"; // default (processing)
  };

  const getStatusIcon = (s) => {
    const stat = s?.toLowerCase();
    if (stat === "delivered") return "check_circle";
    if (stat === "cancelled") return "cancel";
    if (stat === "in_transit") return "pulse"; // We'll handle this in the render!
    return null; 
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar animate-in fade-in duration-300">
      <main className="w-full max-w-7xl mx-auto pt-4 pb-12">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Order Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Track and manage all purchase orders</p>
        </div>

        {/* --- FILTERS SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white dark:bg-[#1a2235] p-4 rounded-xl border border-slate-200 dark:border-[#2d3a54] shadow-sm">
          
          <div className="relative w-full sm:w-80 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px] group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-slate-50 dark:bg-[#101622]/50 border-b border-slate-200 dark:border-[#2d3a54] border-t-0 border-l-0 border-r-0 rounded-t-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-0 focus:border-primary focus:bg-slate-100 dark:focus:bg-[#101622] transition-all placeholder:text-slate-500 outline-none" 
              placeholder="Search by tracking or provider..." 
              type="text"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <select className="w-full sm:w-48 appearance-none bg-slate-50 dark:bg-[#101622]/50 border-b border-slate-200 dark:border-[#2d3a54] border-t-0 border-l-0 border-r-0 rounded-t-lg pl-4 pr-10 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-0 focus:border-primary transition-all cursor-pointer outline-none">
                <option value="">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
            </div>
            
            <button className="bg-slate-50 dark:bg-[#101622]/50 border border-slate-200 dark:border-[#2d3a54] text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#232a38] rounded-lg px-4 py-2.5 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
          </div>
        </div>

        {/* --- DATA TABLE CARD --- */}
        <div className="bg-white dark:bg-[#1a2235] rounded-2xl border border-slate-200 dark:border-[#2d3a54] overflow-hidden shadow-sm relative min-h-[400px]">
          
          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#1a2235]/50 backdrop-blur-sm z-10">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#101622]/50 border-b border-slate-200 dark:border-[#2d3a54] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  <th className="px-6 py-4">Tracking Number</th>
                  <th className="px-6 py-4">Provider Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Total Cost</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-[#2d3a54]">
                
                {!isLoading && orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-500">
                      No orders found in the database.
                    </td>
                  </tr>
                )}

                {/* DYNAMIC LOOP */}
                {orders.map((order, i) => {
                  const isCancelled = order.status?.toLowerCase() === 'cancelled';
                  const color = getStatusColor(order.status);
                  const icon = getStatusIcon(order.status);

                  return (
                    <tr key={i} className={`hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group ${isCancelled ? 'bg-slate-50/50 dark:bg-[#101622]/30' : ''}`}>
                      
                      <td className={`px-6 py-4 font-mono font-medium ${isCancelled ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        <div 
                          onClick={() => navigate(`/recycling/orders/${order.id}`)}
                          className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors inline-flex w-max"
                        >
                          <span className={`material-symbols-outlined text-[18px] ${isCancelled ? 'text-slate-500 dark:text-slate-600' : 'text-primary'}`}>tag</span>
                          <span className="hover:underline">{order.order_id || order.id}</span>
                        </div>
                      </td>
                      
                      <td className={`px-6 py-4 ${isCancelled ? 'text-slate-400 dark:text-slate-500 line-through decoration-red-500/50' : 'text-slate-700 dark:text-slate-300'}`}>
                        {order.provider?.name || order.provider || "Unknown Provider"}
                      </td>
                      
                      <td className={`px-6 py-4 ${isCancelled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      
                      <td className={`px-6 py-4 text-right font-medium ${isCancelled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        ${Number(order.total_cost || 0).toLocaleString()}
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${color}-100 dark:bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 border border-${color}-500/20`}>
                          {icon === 'pulse' && <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400 animate-pulse`}></span>}
                          {icon && icon !== 'pulse' && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
                          {!icon && <span className={`w-1.5 h-1.5 rounded-full bg-${color}-400`}></span>}
                          {order.status?.replace('_', ' ')}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
          
          {/* --- PAGINATION --- */}
          <div className="bg-slate-50 dark:bg-[#101622]/50 border-t border-slate-200 dark:border-[#2d3a54] px-6 py-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div>Showing <span className="text-slate-900 dark:text-white font-bold">{orders.length > 0 ? 1 : 0}</span> to <span className="text-slate-900 dark:text-white font-bold">{orders.length}</span> of <span className="text-slate-900 dark:text-white font-bold">{orders.length}</span> entries</div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2d3a54] flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg border border-primary bg-primary/10 text-primary font-bold flex items-center justify-center transition-colors">1</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-[#2d3a54] flex items-center justify-center hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors font-bold">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}