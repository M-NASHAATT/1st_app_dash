import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { rewardService } from '../services/rewardService';
import api from '../services/api'; // We import this directly to handle the Laravel Image Quirk

export default function EditReward() {
  const navigate = useNavigate();
  const { id } = useParams(); // Grab the Reward ID from the URL

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points_required: '',
    stock_quantity: '',
  });
  
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);

  // 1. FETCH THE EXISTING REWARD DATA
  useEffect(() => {
    const fetchReward = async () => {
      try {
        const responseData = await rewardService.getRewardById(id);
        
        // Unwrap Laravel response
        const reward = responseData?.data?.reward || responseData?.data || responseData;
        
        // Pre-fill the form!
        setFormData({
          name: reward.name || '',
          description: reward.description || '',
          points_required: reward.points_required || '',
          stock_quantity: reward.stock_quantity || '',
        });
        
        // Pre-fill the image!
        if (reward.image) {
          setImagePreview(reward.image);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load reward:", error);
        toast.error("Failed to load reward details.");
        navigate('/rewards'); // Kick them back if it fails
      }
    };

    fetchReward();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // 2. SUBMIT THE UPDATES
  const handleSubmit = async () => {
    if (!formData.name || !formData.points_required || !formData.stock_quantity) {
      return toast.error("Please fill in all required fields!");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating reward...");

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || '');
      data.append('points_required', formData.points_required);
      data.append('stock_quantity', formData.stock_quantity);
      
      // Only append the image if they uploaded a NEW one
      if (imageFile) {
        data.append('image', imageFile);
      }

      // THE LARAVEL QUIRK: Must use POST and spoof a PUT request to upload images!
      data.append('_method', 'PUT'); 

      await api.post(`/admin/rewards/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("Reward updated successfully!", { id: toastId });
      navigate('/rewards'); 

    } catch (error) {
      console.error("Failed to update reward:", error);
      toast.error("Server error. Could not update reward.", { id: toastId });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-background-light dark:bg-background-dark">
      <main className="max-w-[1200px] w-full mx-auto px-6 py-8 lg:px-12">
        
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-[#92a4c9] text-sm mb-4">
            <Link to="/rewards" className="hover:text-primary transition-colors">Rewards</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">Edit Reward</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Edit Reward</h1>
              <p className="text-slate-500 dark:text-[#92a4c9] mt-1">Update inventory, pricing, or description.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/rewards')} className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-border-dark text-slate-700 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-surface-dark transition-all">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">General Information</h3>
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Reward Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none min-h-[120px]"></textarea>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory & Pricing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Point Cost *</label>
                  <div className="relative">
                    <input name="points_required" value={formData.points_required} onChange={handleChange} className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 pl-12 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">token</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-white/80">Stock Quantity *</label>
                  <div className="relative">
                    <input name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="w-full rounded-lg border border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/50 p-3 pl-12 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">inventory_2</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Media */}
          <div className="lg:col-span-1 space-y-6">
            <section className="rounded-xl bg-white dark:bg-[#1c2636] p-6 border border-slate-200 dark:border-[#2d3a54]/50 mb-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">image</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reward Media</h3>
              </div>
              <div className="flex flex-col gap-4">
                <label className="aspect-square w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-border-dark bg-slate-50 dark:bg-background-dark/30 flex flex-col items-center justify-center text-center p-2 group cursor-pointer hover:border-primary/50 transition-colors overflow-hidden relative">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <>
                      <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-3xl">cloud_upload</span></div>
                      <p className="text-slate-900 dark:text-white font-medium">Upload New Thumbnail</p>
                      <p className="text-xs text-slate-500 mt-2">JPG, PNG or WEBP</p>
                    </>
                  )}
                </label>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}