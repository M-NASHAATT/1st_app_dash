export default function StatCard({ icon, title, value }) {
  return (
    <div className="card p-6 rounded-xl bg-white dark:bg-[#151c2c] border border-primary/10 shadow-sm">
      <span className="material-symbols-outlined text-primary mb-2">{icon}</span>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}