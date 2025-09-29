import React from "react";
import { motion } from "framer-motion";

export default function SkillsBlock({ data }) {
  const subcats = [
    { key: "frontendSkills", title: "Frontend" },
    { key: "backendSkills", title: "Backend" },
    { key: "tools", title: "Tools" },
    { key: "programmingLanguages", title: "Languages" },
  ];

  return (
    <section id="skills" className="pf1-section">
      <h3>Skills</h3>

      {subcats.map((sc) => {
        const arr = data[sc.key] || [];
        if (!arr.length) return null;
        return (
          <div key={sc.key} className="skills-subcat">
            <h4>{sc.title}</h4>
            <div className="pf1-skill-grid">
              {arr.map((s, i) => {
                const safeName = s.toLowerCase().replace(/\s|\+|\.|#/g,"_");

                const iconPath = `/icons/${safeName}/${safeName}-original.svg`;

                return (
                  <motion.div
                    key={i}
                    className="pf1-skill"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={iconPath}
                      alt={s}
                      style={{width:40 ,height:40}}
                      className="pf1-skill-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/icons/default.png";
                      }}
                    />
                    <span>{s}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}


      // <SkillsBlock data={data} />