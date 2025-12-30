import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function AnalyticsChart({ views }) {
  const data = [
    { name: "Views", value: views || 0 },
    { name: "Remaining", value: Math.max(100 - (views || 0), 0) },
  ];
  const COLORS = ["#00C49F", "#EEE"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
