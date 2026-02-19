
// // import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// // export default function AnalyticsChart({ views }) {
// //   // Dummy data: Jar backend madhun array yet asel tar to use kara
// //   const data = [
// //     { day: "Mon", v: 10 },
// //     { day: "Tue", v: 25 },
// //     { day: "Wed", v: views || 40 }, // Current views use karnya sathi
// //     { day: "Thu", v: 30 },
// //     { day: "Fri", v: 55 },
// //     { day: "Sat", v: 70 },
// //     { day: "Sun", v: 90 },
// //   ];

// //   return (
// //     <div style={{ width: '100%', height: 250, background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '20px' }}>
// //       <ResponsiveContainer width="100%" height="100%">
// //         <LineChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
// //           <XAxis 
// //             dataKey="day" 
// //             stroke="#A1A1AA" 
// //             fontSize={12} 
// //             tickLine={false} 
// //             axisLine={false} 
// //           />
// //           <YAxis hide />
// //           <Tooltip 
// //             contentStyle={{ backgroundColor: '#050816', border: '1px solid rgba(79, 111, 255, 0.2)', borderRadius: '10px' }}
// //             itemStyle={{ color: '#4F6FFF' }}
// //           />
// //           <Line 
// //             type="monotone" 
// //             dataKey="v" 
// //             stroke="#4F6FFF" 
// //             strokeWidth={3} 
// //             dot={{ fill: '#4F6FFF', r: 4 }} 
// //             activeDot={{ r: 8, stroke: 'rgba(79, 111, 255, 0.5)', strokeWidth: 10 }} 
// //           />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }





// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// export default function AnalyticsChart({ data = [] }) {
//   // data expected format:
//   // [
//   //   { date: "2026-02-11", views: 3 },
//   //   { date: "2026-02-12", views: 5 }
//   // ]

//   const formattedData = data.map((item) => ({
//     day: new Date(item.date).toLocaleDateString("en-IN", {
//       weekday: "short",
//     }),
//     v: item.views,
//   }));

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: 250,
//         background: "rgba(255,255,255,0.02)",
//         padding: "15px",
//         borderRadius: "20px",
//       }}
//     >
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={formattedData}>
//           <CartesianGrid
//             strokeDasharray="3 3"
//             stroke="rgba(255,255,255,0.05)"
//             vertical={false}
//           />

//           <XAxis
//             dataKey="day"
//             stroke="#A1A1AA"
//             fontSize={12}
//             tickLine={false}
//             axisLine={false}
//           />

//           <YAxis hide />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#050816",
//               border: "1px solid rgba(79, 111, 255, 0.2)",
//               borderRadius: "10px",
//             }}
//             itemStyle={{ color: "#4F6FFF" }}
//           />

//           <Line
//             type="monotone"
//             dataKey="v"
//             stroke="#4F6FFF"
//             strokeWidth={3}
//             dot={{ fill: "#4F6FFF", r: 4 }}
//             activeDot={{
//               r: 8,
//               stroke: "rgba(79, 111, 255, 0.5)",
//               strokeWidth: 10,
//             }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsChart({
  data = [],
  totalViews = 0,
  weeklyViews = 0,
  monthlyViews = 0,
  growth = 0,
}) {

  const formattedData = data.map((item) => ({
    day: new Date(item.date).toLocaleDateString("en-IN", {
      weekday: "short",
    }),
    v: item.views,
  }));

  const isPositive = Number(growth) >= 0;

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.02)",
        padding: "20px",
        borderRadius: "20px",
      }}
    >

      {/* ===== TOP STATS ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div style={statStyle}>
          <p>Total</p>
          <h3>{totalViews}</h3>
        </div>

        <div style={statStyle}>
          <p>Weekly</p>
          <h3>{weeklyViews}</h3>
        </div>

        <div style={statStyle}>
          <p>Monthly</p>
          <h3>{monthlyViews}</h3>
        </div>

        <div style={statStyle}>
          <p>Growth</p>
          <h3 style={{ color: isPositive ? "#22c55e" : "#ff4d4f" }}>
            {isPositive ? "▲" : "▼"} {Math.abs(growth)}%
          </h3>
        </div>
      </div>

      {/* ===== CHART ===== */}
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#A1A1AA"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis hide />

            <Tooltip
              contentStyle={{
                backgroundColor: "#050816",
                border: "1px solid rgba(79, 111, 255, 0.2)",
                borderRadius: "10px",
              }}
            />

            <Line
              type="monotone"
              dataKey="v"
              stroke="#4F6FFF"
              strokeWidth={3}
              dot={{ fill: "#4F6FFF", r: 4 }}
              activeDot={{
                r: 8,
                stroke: "rgba(79, 111, 255, 0.5)",
                strokeWidth: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const statStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "10px",
  borderRadius: "12px",
  textAlign: "center",
  color: "white",
};
