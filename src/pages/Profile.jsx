import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { adminService } from '../services/adminService';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. STATE FOR REAL DATA
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // Only used if they want to change it
    password_confirmation: "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 2. FETCH PROFILE ON LOAD
  // 2. FETCH PROFILE ON LOAD
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseData = await adminService.getMe();
        console.log("BACKEND ADMIN RESPONSE:", responseData); // X-RAY

        // THE ULTIMATE UNWRAPPER
        const admin = 
          responseData?.data?.admin || 
          responseData?.data?.user || 
          responseData?.admin || 
          responseData?.user || 
          responseData?.data || 
          responseData;

        setAdminData({
          name: admin?.name || "",
          email: admin?.email || "",
          phone: admin?.phone || "",
          password: "", // Never pre-fill password!
        });

        if (admin?.image || admin?.avatar) {
          setImagePreview(admin.image || admin.avatar);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Failed to load profile data.");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);
  
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // 3. SUBMIT UPDATES TO BACKEND
  const handleSave = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      if (adminData.name) formData.append('name', adminData.name);
      if (adminData.email) formData.append('email', adminData.email);
      if (adminData.phone) formData.append('phone', adminData.phone);
      
      if (adminData.password) {
        if (adminData.password !== adminData.password_confirmation) {
          setIsSubmitting(false);
          return toast.error("Passwords do not match!", { id: toastId });
        }
        formData.append('password', adminData.password);
        formData.append('password_confirmation', adminData.password_confirmation);
      }
       // Only send if they typed a new one!
      if (imageFile) formData.append('image', imageFile);

      await adminService.updateProfile(formData);

      toast.success('Profile updated successfully!', { id: toastId });
      setIsEditing(false);
      setIsSubmitting(false);
    } 
    catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.", { id: toastId });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="flex flex-col gap-8 h-full bg-background-light dark:bg-background-dark overflow-y-auto custom-scrollbar p-6 lg:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
        
        {/* --- HEADER & COVER PHOTO --- */}
        <div className="bg-white dark:bg-[#1a2235] rounded-3xl border border-slate-200 dark:border-[#2d3a54] overflow-hidden shadow-sm">
          
          <div className="h-48 w-full bg-gradient-to-r from-primary/80 to-indigo-600/80 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          </div>

          <div className="px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              
              {/* Avatar & Upload */}
              <div className="flex items-end gap-6 -mt-12 relative z-10">
                <label className={`relative group ${isEditing ? 'cursor-pointer' : ''}`}>
                  <input type="file" accept="image/*" onChange={handleImageChange} disabled={!isEditing} className="hidden" />
                  <img 
                    src={imagePreview || "https://i.pravatar.cc/150"} 
                    alt="Admin Profile" 
                    className={`w-32 h-32 rounded-2xl border-4 border-white dark:border-[#1a2235] object-cover bg-slate-100 ${isEditing ? 'group-hover:opacity-70 transition-opacity' : ''}`}
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="material-symbols-outlined drop-shadow-md">photo_camera</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-[#1a2235] rounded-full shadow-lg"></div>
                </label>

                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {adminData.name || "Admin User"}
                  </h1>
                  <p className="text-primary font-bold flex items-center gap-1.5 mt-1">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    Super Administrator
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button onClick={() => setIsEditing(false)} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-[#2d3a54] text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-[#101622] transition-colors disabled:opacity-50">
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50">
                      <span className="material-symbols-outlined text-sm">{isSubmitting ? 'sync' : 'save'}</span> 
                      {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">edit_document</span> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-white dark:bg-[#1a2235] border border-slate-200 dark:border-[#2d3a54] rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">account_circle</span>
            Personal Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Name</label>
              <input 
                name="name" type="text" value={adminData.name} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input 
                name="email" type="email" value={adminData.email} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
              <input 
                name="phone" type="tel" value={adminData.phone} onChange={handleChange} disabled={!isEditing}
                className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>

            {/* PASSWORD CHANGE SECTION (Only visible when editing) */}
            {isEditing && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-[#2d3a54]">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-500 uppercase tracking-wider">New Password</label>
                  <input 
                    name="password" type="password" value={adminData.password} onChange={handleChange} placeholder="Leave blank to keep current"
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-500 uppercase tracking-wider">Confirm Password</label>
                  <input 
                    name="password_confirmation" type="password" value={adminData.password_confirmation} onChange={handleChange} placeholder="Retype new password"
                    className="w-full bg-slate-50 dark:bg-[#101622] border border-slate-200 dark:border-[#2d3a54] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}