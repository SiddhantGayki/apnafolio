// import React from "react";
// import { Helmet } from "react-helmet-async";

// export default function SeoWrapper({ d = {} }) {
//   return (
//     <Helmet>
//       <title>{d.name || "ApnaFolio"} | {d.role || "Portfolio"}</title>
//       <meta name="description" content={d.summary || "Personal portfolio on ApnaFolio"} />
//       <meta property="og:title" content={`${d.name || "ApnaFolio"} | ${d.role || "Portfolio"}`} />
//       <meta property="og:description" content={d.summary || "Portfolio"} />
//       <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
//     </Helmet>
//   );
// }

// <SeoWrapper d={data} />


// import { useEffect } from "react";
// import { Helmet } from "react-helmet-async";

// export default function SeoWrapper({ data }) {
//   const d = data || {};

//   return (
//     <Helmet>
//       <title>{d.name || "Your Name"} | {d.role || "Portfolio"}</title>
//       <meta name="description" content={d.summary || "Personal portfolio on ApnaFolio"} />
//       <meta property="og:title" content={`${d.name || "Your Name"} | ${d.role || "Portfolio"}`} />
//       <meta property="og:description" content={d.summary || "Portfolio showcase"} />
//       <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
//     </Helmet>
//   );
// }

// src/components/SeoWrapper.jsx
// import { Helmet } from "react-helmet-async";

// export default function SeoWrapper({ data }) {
//   const d = data || {};

//   return (
//     <Helmet>
//       <title>{d.name || "Your Name"} | {d.role || "Portfolio"}</title>
//       <meta name="description" content={d.summary || "Personal portfolio created with ApnaFolio"} />
//     </Helmet>
//   );
// }

import { Helmet } from "react-helmet-async";

export default function SeoWrapper({ data }) {
  const d = data || {};

  return (
    <Helmet>
      <title>{d.name || "Your Name"} | {d.role || "Portfolio"}</title>
      <meta name="description" content={d.summary || "Portfolio created with ApnaFolio"} />
      <meta property="og:title" content={`${d.name || "Your Name"} | ${d.role || "Portfolio"}`} />
      <meta property="og:description" content={d.summary || "Portfolio showcase"} />
      <meta property="og:image" content={d.contact?.photo || "/default-avatar.png"} />
    </Helmet>
  );
}
