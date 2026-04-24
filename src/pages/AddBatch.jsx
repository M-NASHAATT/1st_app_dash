import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/recyclingService'; // IMPORT API

export default function AddBatch() {
  const navigate = useNavigate();

  // 1. FORM STATE
  const [formData, setFormData] = useState({
    batch_number: `BCH-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generate a random mock batch number for UX
    title: '',
    batch_type: '',
    total_weight_kg: '',
    weight_unit: 'kg', // Default to kg
    est_price: '',
    status: 'available', // Default status
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. INPUT HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. IMAGE UPLOAD HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview instantly
    }
  };

  // 4. SUBMIT FORM
  const handleSubmit = async () => {
    // Validation based on backend PDF requirements
    if (!formData.batch_number || !formData.title || !formData.batch_type || !formData.total_weight_kg || !formData.est_price || !formData.status) {
      return toast.error("Please fill out all required fields!");
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Saving batch to database...");

    try {
      // We MUST use FormData because we are sending an Image file
      const payload = new FormData();
      payload.append('batch_number', formData.batch_number);
      payload.append('title', formData.title);
      payload.append('batch_type', formData.batch_type);
      payload.append('total_weight_kg', formData.total_weight_kg);
      payload.append('weight_unit', formData.weight_unit);
      payload.append('est_price', formData.est_price);
      payload.append('status', formData.status);
      
      if (imageFile) {
        payload.append('image', imageFile);
      }

      // Call API: POST /admin/batches
      await recyclingService.createBatch(payload);

      toast.success("Batch created successfully!", { id: toastId });
      navigate('/recycling/inventory'); // Kick them back to the table

    } catch (error) {
      console.error("Failed to create batch:", error);
      
      // X-Ray Error Check for Laravel Validation
      if (error.response?.status === 422) {
        toast.error("Validation Error. Check your inputs.", { id: toastId });
        console.log("Laravel Errors:", error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || "Server error. Could not create batch.", { id: toastId });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-surface-dim">
      <main className="max-w-5xl w-full mx-auto px-6 py-8 lg:px-12 animate-in fade-in duration-300">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-12 mt-4">
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-body">
            <Link to="/recycling/inventory" className="hover:text-primary transition-colors">Inventory</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white font-medium">Create New Batch</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-headline font-bold text-white tracking-tight mb-2">Create New Batch</h2>
              <p className="text-slate-400 font-body text-sm">Define material parameters and manifest documentation for procurement entry.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/recycling/inventory')} className="px-6 py-2.5 rounded-xl text-primary font-bold border border-slate-700 hover:bg-[#232a38] transition-colors">
                Discard Changes
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold shadow-[0_8px_32px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Publishing..." : "Confirm & Publish"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* General Information */}
          <section className="bg-[#19202d] rounded-xl p-8 border border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-headline font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              General Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Batch Number *</label>
                <input 
                  name="batch_number" value={formData.batch_number} onChange={handleChange}
                  className="w-full bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 px-4 focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg outline-none" 
                  type="text" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Title / Description *</label>
                <input 
                  name="title" value={formData.title} onChange={handleChange}
                  className="w-full bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 px-4 focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg outline-none" 
                  placeholder="e.g., High-Grade Silicon Wafers - Q3 Delivery" type="text"
                />
              </div>
            </div>
          </section>

          {/* Materials & Pricing */}
          <section className="bg-[#19202d] rounded-xl p-8 border border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-headline font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
              Materials & Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Batch Type *</label>
                  <div className="relative">
                    <select name="batch_type" value={formData.batch_type} onChange={handleChange} className="w-full bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 px-4 appearance-none focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg cursor-pointer outline-none">
                      <option disabled value="">Select Material Type</option>
                      <option value="plastic">Plastic</option>
                      <option value="glass">Glass</option>
                      <option value="metal">Metal</option>
                      <option value="paper">Paper</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Total Weight *</label>
                  <div className="flex items-end gap-4">
                    <input name="total_weight_kg" value={formData.total_weight_kg} onChange={handleChange} className="flex-1 bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 px-4 focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg outline-none" placeholder="0.00" type="number"/>
                    <div className="flex bg-[#2e3543] rounded-lg p-1 border border-slate-700 shrink-0">
                      <button onClick={() => setFormData({...formData, weight_unit: 'kg'})} className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${formData.weight_unit === 'kg' ? 'bg-[#323948] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>kg</button>
                      <button onClick={() => setFormData({...formData, weight_unit: 'ton'})} className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${formData.weight_unit === 'ton' ? 'bg-[#323948] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>ton</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Estimated Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-body">$</span>
                    <input name="est_price" value={formData.est_price} onChange={handleChange} className="w-full bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 pl-8 pr-4 focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg outline-none" placeholder="0.00" type="number"/>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Status & Manifest */}
          <section className="bg-[#19202d] rounded-xl p-8 border border-slate-700/50 shadow-sm">
            <h3 className="text-xl font-headline font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
              Status & Image
            </h3>
            <div className="space-y-8">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Initial Status *</label>
                <div className="relative">
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#2e3543] border-b border-slate-600 text-white font-body py-3 px-4 appearance-none focus:outline-none focus:border-b-primary focus:border-b-2 transition-all rounded-t-lg cursor-pointer outline-none">
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-slate-400 mb-2 uppercase tracking-wider">Batch Image</label>
                <label className="mt-2 border-2 border-dashed border-slate-600 rounded-xl bg-[#2e3543]/50 p-12 flex flex-col items-center justify-center hover:bg-[#2e3543] hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#151c29] flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-primary transition-colors">cloud_upload</span>
                      </div>
                      <p className="text-white font-bold font-body mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-400 font-body">JPG, PNG, WEBP up to 10MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}