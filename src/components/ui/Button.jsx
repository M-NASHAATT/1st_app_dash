export default function Button({ 
  children,       // The text inside the button
  variant = 'primary', // Default to blue
  icon,           // Optional Material Icon
  className = '', // Allow extra custom classes if needed
  ...props        // Catch onClick, disabled, type="submit", etc.
}) {
  
  // 1. BASE STYLES: Every button gets these (padding, rounded corners, animation)
  const baseStyles = "px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]";

  // 2. VARIANT STYLES: The colors
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90",
    danger: "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600",
    outline: "border border-slate-200 dark:border-[#2d3a54] text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1c2433]"
  };

  // 3. RENDER THE HTML
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {/* If they passed an icon, render the span. Otherwise, ignore it! */}
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
      {children}
    </button>
  );
}