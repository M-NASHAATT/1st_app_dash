import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { rewardService } from '../services/rewardService';

export default function Rewards() {
  const navigate = useNavigate();

  // 1. REAL STATE
  const [rewardsData, setRewardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH THE DATA
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const responseData = await rewardService.getAllRewards();
        console.log("BACKEND REWARDS RESPONSE:", responseData); // X-RAY

        // The Ultimate Laravel Unwrapper
        let rewardsArray = [];
        if (Array.isArray(responseData)) {
          rewardsArray = responseData;
        } else if (Array.isArray(responseData?.data?.data)) {
          rewardsArray = responseData.data.data;
        } else if (Array.isArray(responseData?.data)) {
          rewardsArray = responseData.data;
        } else if (Array.isArray(responseData?.rewards)) {
          rewardsArray = responseData.rewards;
        }

        setRewardsData(rewardsArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load rewards:", error);
        toast.error("Failed to load rewards from server.");
        setIsLoading(false);
      }
    };

    fetchRewards();
  }, []);

  // Helpers
  const getStatusColor = (stock) => {
    if (stock > 10) return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
    if (stock > 0) return "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400";
    return "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400";
  };

  const getStockBarColor = (stock, maxStock) => {
    const percentage = (stock / maxStock) * 100;
    if (percentage > 50) return "bg-primary";
    if (percentage > 0) return "bg-amber-500";
    return "bg-slate-400";
  };

  // 3. DELETE FUNCTION
  const handleDelete = async (rewardId) => {
    // Safety check: Ask the admin to confirm before deleting!
    if (!window.confirm("Are you sure you want to delete this reward? This cannot be undone.")) return;

    // A. Remove it from the screen instantly (Optimistic UI)
    const previousData = [...rewardsData]; // Save a backup just in case the server fails
    setRewardsData(rewardsData.filter(item => item.id !== rewardId));

    try {
      // B. Tell the backend to actually delete it
      await rewardService.deleteReward(rewardId);
      toast.success("Reward deleted successfully!");
    } catch (error) {
      // C. If the server crashes, put the reward back on the screen!
      console.error("Failed to delete:", error);
      toast.error("Failed to delete reward from the server.");
      setRewardsData(previousData); 
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
      <main className="max-w-[1440px] w-full mx-auto px-6 py-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Rewards Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your store items, inventory, and point exchange rates.</p>
          </div>
          <button 
            onClick={() => navigate('/add-reward')} 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add_circle</span> Add New Reward
          </button>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm relative min-h-[400px]">
          
          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#151c2c]/50 backdrop-blur-sm z-10">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px]">
              
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Reward Item</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Points Cost</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Stock Level</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                
                {!isLoading && rewardsData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      No rewards found. Click "Add New Reward" to create one!
                    </td>
                  </tr>
                )}

                {rewardsData.map((item) => (
                  <tr key={item.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group ${item.stock_quantity === 0 ? 'grayscale opacity-70' : ''}`}>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center p-1 relative overflow-hidden">
                          <img src={item.image || "https://images.unsplash.com/photo-1518173946687-a4c8a07d7e02?w=200"} alt={item.name} className="rounded-md opacity-80 object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-xs text-slate-400">SKU: REW-{item.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`${item.stock_quantity === 0 ? 'text-slate-500' : 'text-primary'} font-bold`}>
                        {item.points_required} pts
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getStockBarColor(item.stock_quantity, 100)}`} 
                            style={{ width: `${Math.min((item.stock_quantity / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${item.stock_quantity === 0 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                          {item.stock_quantity} Left
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.stock_quantity)}`}>
                        {item.stock_quantity > 10 ? 'Active' : item.stock_quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* This passes the specific item ID to our new page! */}
                          <button 
                            onClick={() => navigate(`/edit-reward/${item.id}`)}
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                          </button>
                        <button 
                          onClick={() => handleDelete(item.id)} // <--- ADDED THIS!
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}