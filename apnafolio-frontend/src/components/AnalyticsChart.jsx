// // import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// // export default function AnalyticsChart({ views }) {
// //   const data = [
// //     { name: "Views", value: views || 0 },
// //     { name: "Remaining", value: Math.max(100 - (views || 0), 0) },
// //   ];
// //   const COLORS = ["#00C49F", "#EEE"];

// //   return (
// //     <ResponsiveContainer width="100%" height={200}>
// //       <PieChart>
// //         <Pie
// //           data={data}
// //           cx="50%"
// //           cy="50%"
// //           innerRadius={50}
// //           outerRadius={70}
// //           fill="#8884d8"
// //           paddingAngle={5}
// //           dataKey="value"
// //         >
// //           {data.map((entry, index) => (
// //             <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //           ))}
// //         </Pie>
// //         <Tooltip />
// //       </PieChart>
// //     </ResponsiveContainer>
// //   );
// // }

// import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// export default function AnalyticsChart({ views }) {
//   // Data visuals thode better karuya
//   const data = [
//     { name: "Total Views", value: views || 0 },
//     { name: "Target", value: Math.max(1000 - (views || 0), 0) }, // 1000 cha target dakhvne professional diste
//   ];
  
//   // Intro page colors: Neon Blue ani Glassy Gray
//   const COLORS = ["#4F6FFF", "rgba(255, 255, 255, 0.05)"];

//   return (
//     <div className="chart-container-inner" style={{ width: '100%', height: 220, position: 'relative' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={80}
//             paddingAngle={8}
//             dataKey="value"
//             stroke="none"
//           >
//             {data.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip 
//             contentStyle={{ backgroundColor: '#050816', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
//             itemStyle={{ color: '#fff' }}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="chart-center-text">
//         <span className="chart-val">{views || 0}</span>
//         <span className="chart-lab">Views</span>
//       </div>
//     </div>
//   );
// }
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AnalyticsChart({ views }) {
  // Dummy data: Jar backend madhun array yet asel tar to use kara
  const data = [
    { day: "Mon", v: 10 },
    { day: "Tue", v: 25 },
    { day: "Wed", v: views || 40 }, // Current views use karnya sathi
    { day: "Thu", v: 30 },
    { day: "Fri", v: 55 },
    { day: "Sat", v: 70 },
    { day: "Sun", v: 90 },
  ];

  return (
    <div style={{ width: '100%', height: 250, background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#A1A1AA" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#050816', border: '1px solid rgba(79, 111, 255, 0.2)', borderRadius: '10px' }}
            itemStyle={{ color: '#4F6FFF' }}
          />
          <Line 
            type="monotone" 
            dataKey="v" 
            stroke="#4F6FFF" 
            strokeWidth={3} 
            dot={{ fill: '#4F6FFF', r: 4 }} 
            activeDot={{ r: 8, stroke: 'rgba(79, 111, 255, 0.5)', strokeWidth: 10 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}