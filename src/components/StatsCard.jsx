export default function StatsCard({ value, label }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-md text-gray-500">{label}</div>
    </div>
  );
}
