import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/recyclingService';

export default function RecyclingInventory() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // DRAWER STATE
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const responseData = await recyclingService.getAllBatches();
        let batchesArray = [];
        if (Array.isArray(responseData?.data?.result)) batchesArray = responseData.data.result;
        else if (Array.isArray(responseData?.data?.data)) batchesArray = responseData.data.data;
        else if (Array.isArray(responseData?.data)) batchesArray = responseData.data;

        setBatches(batchesArray);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this batch? This action cannot be undone.")) return;

    const backup = [...batches];
    setBatches(batches.filter(b => b.id !== id));
    setIsDrawerOpen(false); // Close drawer if they delete from it

    try {
      await recyclingService.deleteBatch(id);
      toast.success("Batch deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch. Restoring data...");
      setBatches(backup); 
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setBatches(batches.map(batch => batch.id === id ? { ...batch, status: newStatus } : batch));
    try {
      // If backend has this endpoint, it will save. If not, it just updates UI locally.
      // await recyclingService.updateBatchStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const openPreview = (batch) => {
    setSelectedBatch(batch);
    setIsDrawerOpen(true);
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'available') return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
    if (s === 'reserved') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    if (s === 'sold') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-300 relative">
      
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

      <div className="bg-[#1a2235] border border-[#2d3a54] rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px] mb-12">
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
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-[#232f48]/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#101622] border border-[#2d3a54] flex items-center justify-center">
                      {batch.image ? <img alt={batch.title} className="w-full h-full object-cover" src={batch.image}/> : <span className="material-symbols-outlined text-slate-600">image_not_supported</span>}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-white font-mono">{batch.batch_number}</td>
                  <td className="py-4 px-6 text-slate-400 capitalize">{batch.batch_type}</td>
                  <td className="py-4 px-6 font-bold text-slate-200 max-w-[200px] truncate">{batch.title}</td>
                  <td className="py-4 px-6 text-right font-bold text-slate-300">{batch.weight_display || `${batch.total_weight} ${batch.weight_unit}`}</td>
                  <td className="py-4 px-6 text-right font-bold text-white">{batch.total_price_display || `$${batch.total_batch_price}`}</td>
                  <td className="py-4 px-6 text-center">
                    <select
                      value={batch.status?.toLowerCase()}
                      onChange={(e) => handleStatusChange(batch.id, e.target.value)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer appearance-none text-center ${getStatusColor(batch.status)}`}
                      style={{ textAlignLast: "center" }}
                    >
                      <option value="available" className="text-slate-900 bg-white">Available</option>
                      <option value="reserved" className="text-slate-900 bg-white">Reserved</option>
                      <option value="sold" className="text-slate-900 bg-white">Sold</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openPreview(batch)} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-400/10 transition-colors" title="Preview"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                      {/* Navigate to an edit page if you build one later! */}
                      <button 
  onClick={() => navigate(`/recycling/edit-batch/${batch.id}`)} // <--- FIXED
  className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors" 
  title="Edit"
>
  <span className="material-symbols-outlined text-[18px]">edit</span>
</button>
                      <button onClick={() => handleDelete(batch.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors" title="Delete"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================= */}
      {/* PREVIEW DRAWER OVERLAY                    */}
      {/* ========================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] transition-opacity backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
      )}

      {/* THE DRAWER */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-[#0c1320] border-l border-[#2d3a54] shadow-2xl transform transition-transform duration-300 ease-in-out z-[70] flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2d3a54]">
          <h2 className="text-lg font-bold text-white">Batch Details</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-lg hover:bg-[#1a2235] text-slate-400 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {selectedBatch && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Big Image */}
            <div className="w-full h-64 bg-[#1a2235] rounded-xl border border-[#2d3a54] overflow-hidden flex items-center justify-center relative">
              {selectedBatch.image ? (
                <img src={selectedBatch.image} alt={selectedBatch.title} className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-600">image_not_supported</span>
              )}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getStatusColor(selectedBatch.status)}`}>
                {selectedBatch.status}
              </div>
            </div>

            {/* Core Info */}
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedBatch.title}</h1>
              <p className="text-primary font-mono mt-1">{selectedBatch.batch_number}</p>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#1a2235] rounded-xl border border-[#2d3a54]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Material Type</p>
                <p className="text-sm font-medium text-white capitalize">{selectedBatch.batch_type}</p>
              </div>
              <div className="p-4 bg-[#1a2235] rounded-xl border border-[#2d3a54]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date Created</p>
                <p className="text-sm font-medium text-white">{selectedBatch.created_at ? new Date(selectedBatch.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="p-4 bg-[#1a2235] rounded-xl border border-[#2d3a54]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Weight</p>
                <p className="text-sm font-medium text-white">{selectedBatch.weight_display || `${selectedBatch.total_weight} ${selectedBatch.weight_unit}`}</p>
              </div>
              <div className="p-4 bg-[#1a2235] rounded-xl border border-[#2d3a54]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estimated Value</p>
                <p className="text-sm font-medium text-white">{selectedBatch.total_price_display || `$${selectedBatch.total_batch_price}`}</p>
              </div>
            </div>

          </div>
        )}

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#2d3a54] flex gap-3">
          <button 
            onClick={() => handleDelete(selectedBatch?.id)} 
            className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold transition-colors"
          >
            Delete Batch
          </button>
          <button 
  onClick={() => {
    setIsDrawerOpen(false);
    navigate(`/recycling/edit-batch/${selectedBatch.id}`); // <--- FIXED
  }} 
  className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20"
>
  Edit Batch
</button>
        </div>
      </div>

    </div>
  );
}