export default function GlassCard({ children }) {
  return (
    <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col gap-8">
      {/* 
        "children" is a magical React word. 
        It means: "Put whatever the user types inside this box right here." 
      */}
      {children}
    </div>
  );
}