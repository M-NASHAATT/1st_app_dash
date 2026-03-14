import StatCard from '../components/StatCard';
import GrowthChart from '../components/GrowthChart';
import ActivityFeed from '../components/ActivityFeed';

export default function Dashboard() {
  return (
    <>
      {/* STATS AREA */}
      <div className="grid xl:grid-cols-4 gap-6 mb-8">
        <StatCard icon="diversity_2" title="Total Users" value="24,852" />
        <StatCard icon="workspace_premium" title="Impact Points" value="1,240,500" />
        <StatCard icon="emergency_home" title="Active Alerts" value="14" />
        <StatCard icon="co2" title="CO2 Offset" value="428.5 Tons" />
      </div>

      {/* CHARTS AREA */}
      <div className="grid xl:grid-cols-3 gap-8">
          <GrowthChart />
          <ActivityFeed />
      </div>
    </>
  );
}