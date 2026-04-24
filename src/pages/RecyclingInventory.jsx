import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/recyclingService'; // IMPORT API

export default function RecyclingInventory() {
  const navigate = useNavigate();

  // 1. STATE
  const [batches, setBatches] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // Let's track the total from pagination!
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH BATCHES
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const responseData = await recyclingService.getAllBatches();
        console.log("BACKEND BATCHES RESPONSE:", responseData); // X-RAY

        // THE ULTIMATE UNWRAPPER (Now checking data.result!)
        let batchesArray = [];
        if (Array.isArray(responseData?.data?.result)) {
          batchesArray = responseData.data.result; // <--- This matches your JSON exactly!
        } else if (Array.isArray(responseData?.data?.data)) {
          batchesArray = responseData.data.data;
        } else if (Array.isArray(responseData?.data)) {
          batchesArray = responseData.data;
        }

        setBatches(batchesArray);
        
        // Grab the total count from their meta pagination object if it exists
        setTotalCount(responseData?.data?.meta?.pagination?.total || batchesArray.length);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load batches:", error);
        toast.error("Failed to load inventory from server.");
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, []);

  // 3. DELETE BATCH FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;

    // Optimistic UI
    const backup = [...batches];
    setBatches(batches.filter(b => b.id !== id));

    try {
      await recyclingService.deleteBatch(id);
      toast.success("Batch deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch.");
      setBatches(backup); // Restore if server fails
    }
  };

  // HELPER: Status Colors
  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'available') return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
    if (s === 'reserved') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    if (s === 'sold') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Inventory & Batches</h1>
          <p className="text-slate-400 text-sm mt-2">Manage all material batches in the marketplace</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/recycling/add-batch')} className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span> Add New Batch
          </button>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a2235] border border-[#2d3a54] rounded-xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold text-[10px]">Total Active Batches</p>
              <h3 className="text-blue-400 text-3xl font-bold">{totalCount}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#101622] flex items-center justify-center"><span className="material-symbols-outlined text-blue-400">inventory_2</span></div>
          </div>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-[#1a2235] border border-[#2d3a54] rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px] relative">
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a2235]/50 backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#101622]/50 border-b border-[#2d3a54]">
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider w-20">Batch</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Number</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider">Title</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Weight</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Est. Price</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider text-center">Status</th>
                <th className="py-4 px-6 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-[#2d3a54]/50">
              
              {!isLoading && batches.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-slate-500">
                    No batches found. Click "Add New Batch" to create one.
                  </td>
                </tr>
              )}

              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-[#232f48]/50 transition-colors group">
                  
                  {/* Image */}
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#101622] border border-[#2d3a54] flex items-center justify-center">
                      {batch.image ? (
                        <img alt={batch.title} className="w-full h-full object-cover" src={batch.image}/>
                      ) : (
                        <span className="material-symbols-outlined text-slate-600">image_not_supported</span>
                      )}
                    </div>
                  </td>
                  
                  {/* Number & Type & Title */}
                  <td className="py-4 px-6 font-bold text-white font-mono">{batch.batch_number}</td>
                  <td className="py-4 px-6 text-slate-400 capitalize">{batch.batch_type}</td>
                  <td className="py-4 px-6 font-bold text-slate-200 max-w-[200px] truncate" title={batch.title}>{batch.title}</td>
                  
                  {/* We are now using their pre-formatted strings! */}
                  <td className="py-4 px-6 text-right font-bold text-slate-300">{batch.weight_display || `${batch.total_weight} ${batch.weight_unit}`}</td>
                  <td className="py-4 px-6 text-right font-bold text-white">{batch.total_price_display || `$${batch.total_batch_price}`}</td>
                  
                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors" title="Edit"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                      <button onClick={() => handleDelete(batch.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors" title="Delete"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
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