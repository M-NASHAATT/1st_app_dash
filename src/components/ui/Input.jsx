import { useState } from 'react';

export default function Input({ 
  label,          
  icon,           
  type = "text",  
  className = "", 
  ...props        
}) {
  // Add state to track if the password should be shown
  const [showPassword, setShowPassword] = useState(false);

  // If this is a password field, we toggle between text/password. Otherwise, use the normal type.
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`space-y-2 ${className}`}>
      
      {label && (
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
          {label}
        </label>
      )}

      <div className="relative">
        
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm z-10">
            {icon}
          </span>
        )}

        <input 
          type={inputType}
          {...props} 
          className={`
            w-full bg-slate-50 dark:bg-[#111722] 
            border border-slate-200 dark:border-[#2d3a54] 
            rounded-xl py-3.5 text-sm text-slate-900 dark:text-white 
            placeholder-slate-400 dark:placeholder-slate-600 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
            transition-colors disabled:opacity-70 disabled:cursor-not-allowed
            ${icon ? 'pl-11' : 'pl-4'} 
            ${type === "password" ? 'pr-12' : 'pr-4'} 
          `}
        />

        {/* If the developer asked for a password field, automatically render the Eye icon! */}
        {type === "password" && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-[#2d3a54] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}

      </div>
    </div>
  );
}