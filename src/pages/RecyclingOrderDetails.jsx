import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/recyclingService'; // IMPORT API

export default function RecyclingOrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // The order ID from the URL!

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Form State
  const [status, setStatus] = useState('');

  // 1. FETCH THE ORDER DETAILS
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const responseData = await recyclingService.getOrderById(id);
        console.log("BACKEND ORDER RESPONSE:", responseData); // X-RAY
        
        // Unwrap Laravel response safely
        const actualData = responseData?.data?.order || responseData?.data || responseData;
        
        setOrder(actualData);
        setStatus(actualData.status || 'processing');
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load order:", error);
        toast.error("Failed to load order details.");
        navigate('/recycling/orders'); // Kick back if it fails
      }
    };

    fetchOrder();
  }, [id, navigate]);

  // 2. SUBMIT STATUS UPDATE
  const handleUpdateStatus = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating order status...");

    try {
      // The API expects POST /admin/orders/{id}/status
      const payload = { status: status };
      
      await recyclingService.updateOrderStatus(id, payload);

      // Update local UI
      setOrder({ ...order, status: status });
      toast.success(`Order marked as ${status.replace('_', ' ')}!`, { id: toastId });
      setIsSubmitting(false);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error(error.response?.data?.message || "Failed to update order.", { id: toastId });
      setIsSubmitting(false);
    }
  };

  // HELPER: Status Colors
  const getStatusColor = (s) => {
    const stat = s?.toLowerCase();
    if (stat === "delivered" || stat === "confirmed") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (stat === "in_transit" || stat === "carrier_assigned") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    if (stat === "cancelled") return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;
  }

  if (!order) return null; // Safety catch

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
      <main className="flex-1 flex flex-col relative z-0 p-8 md:p-12 w-full max-w-7xl mx-auto animate-in fade-in duration-300">
        
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 mt-4">
          <button 
            onClick={() => navigate('/recycling/orders')}
            className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-[#1a2235] hover:bg-slate-50 dark:hover:bg-[#232a38] transition-colors border border-slate-200 dark:border-[#2d3a54] shadow-sm"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Order Details</h1>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border capitalize ${getStatusColor(order.status)}`}>
                {order.status?.replace('_', ' ')}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 font-mono">
              {order.order_id || id}
            </p>
          </div>
        </header>

        {/* --- SPLIT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Provider Info */}
              <div className="bg-white dark:bg-[#1a2235] rounded-xl p-6 border border-slate-200 dark:border-[#2d3a54] flex flex-col shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">storefront</span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Provider Info</h2>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <img alt="Provider" className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-[#2d3a54]" src={order.provider?.image || "https://i.pravatar.cc/150?u=prov"}/>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold">{order.provider?.name || "Unknown Provider"}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">ID: {order.provider?.id || "N/A"}</p>
                  </div>
                </div>
              </div>
              
              {/* Delivery Info */}
              <div className="bg-white dark:bg-[#1a2235] rounded-xl p-6 border border-slate-200 dark:border-[#2d3a54] flex flex-col shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Destination Hub</h2>
                </div>
                <div className="mt-auto">
                  <p className="text-slate-900 dark:text-white font-bold">{order.destination_hub || "Default Hub"}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{order.delivery_governorate || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Invoice Batches */}
            <div className="bg-white dark:bg-[#1a2235] rounded-xl p-8 border border-slate-200 dark:border-[#2d3a54] shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Invoice Manifest</h2>
              <div className="flex flex-col gap-4">
                
                {/* Dynamic Loop for Items */}
                {order.items?.length > 0 ? order.items.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-[#101622]/50 rounded-xl border border-transparent hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-white dark:bg-[#1a2235] flex items-center justify-center border border-slate-200 dark:border-[#2d3a54]">
                        <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">{item.title || "Material Batch"}</p>
                        <p className="text-xs text-slate-500 mt-0.5 font-mono">Batch ID: {item.batch_id}</p>
                      </div>
                    </div>
                    <div className="sm:text-right ml-14 sm:ml-0">
                      <p className="text-slate-900 dark:text-white font-bold text-sm">Qty: {item.requested_weight} {item.weight_unit || 'kg'}</p>
                      <p className="text-xs text-primary font-bold mt-0.5">${Number(item.price || 0).toLocaleString()}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 italic">No items found in this order.</p>
                )}

              </div>
            </div>

            {/* Cost Summary */}
            <div className="bg-slate-50 dark:bg-[#232a38]/50 rounded-xl p-8 border border-slate-200 dark:border-[#2d3a54] flex flex-col sm:flex-row sm:items-end justify-between gap-6 shadow-inner">
              <div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Total Procurement Value</p>
                <h3 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-none">
                  ${Number(order.total_cost || 0).toLocaleString()}
                </h3>
              </div>
              <div className="h-2 w-full sm:w-32 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
            </div>
            
          </div>

          {/* ========================================= */}
          {/* RIGHT PANEL: INTERACTION MODULE           */}
          {/* ========================================= */}
          <div className="lg:col-span-5 relative z-10">
            <div className="bg-white/80 dark:bg-[#1a2235]/80 backdrop-blur-2xl rounded-2xl p-8 lg:sticky lg:top-8 shadow-xl border border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 tracking-wide">Update Order Status</h2>
              
              <div className="flex flex-col gap-6">
                
                {/* Status Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">Current Phase</label>
                  <div className="relative group">
                    <select 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#101622] text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#2d3a54] border-t-0 border-l-0 border-r-0 rounded-t-xl h-14 pl-4 pr-10 appearance-none focus:ring-0 focus:outline-none transition-all focus:border-b-primary focus:border-b-2 cursor-pointer outline-none capitalize"
                    >
                      <option value="processing">Processing</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="carrier_assigned">Carrier Assigned</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors">expand_more</span>
                  </div>
                </div>

                <button 
                  onClick={handleUpdateStatus}
                  disabled={isSubmitting}
                  className="mt-4 w-full h-14 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50" 
                >
                  {isSubmitting ? "Updating..." : "Commit Status Update"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}