import StatBox from '../components/StatBox';
import GrowthChart from '../components/GrowthChart';
import ActivityFeed from '../components/ActivityFeed';

export default function Dashboard() {
  return (
    <>
      {/* STATS AREA */}
      <div className="grid xl:grid-cols-4 gap-6 mb-8">
        <StatBox icon="diversity_2" title="Total Users" value="24,852" />
        <StatBox icon="workspace_premium" title="Impact Points" value="1,240,500" />
        <StatBox icon="emergency_home" title="Active Alerts" value="14" />
        <StatBox icon="co2" title="CO2 Offset" value="428.5 Tons" />
      </div>

      {/* CHARTS AREA */}
      <div className="grid xl:grid-cols-3 gap-8">
          <GrowthChart />
          <ActivityFeed />
      </div>
    </>
  );
}