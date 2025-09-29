import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";

// ✅ Import all 11 templates
import Template1 from "../../templates/Template1";
import Template2 from "../../templates/Template2";
import Template3 from "../../templates/Template3";
import Template4 from "../../templates/Template4";
import Template5 from "../../templates/Template5";
import Template6 from "../../templates/Template6";
import Template7 from "../../templates/Template7";
import Template8 from "../../templates/Template8";
import Template9 from "../../templates/Template9";
import Template10 from "../../templates/Template10";
import Template11 from "../../templates/Template11";

export default function Portfolio() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/user/portfolio/${username}`)
      .then(res => setData(res.data))
      .catch(() => setData({ error: true }));
  }, [username]);

  if (!data) return <p>Loading...</p>;
  if (data.error) return <h3>User not found or portfolio not published</h3>;

  const resume = data.resume || {};
  const templateId = data.templateId;

  // Ensure arrays exist
  resume.skills = resume.skills || [];
  resume.projects = resume.projects || [];
  resume.education = resume.education || [];
  resume.experience = resume.experience || [];
  resume.certifications = resume.certifications || [];
  resume.extras = resume.extras || [];

  // ✅ Template mapping (11 templates)
  const templateMap = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
    template5: Template5,
    template6: Template6,
    template7: Template7,
    template8: Template8,
    template9: Template9,
    template10: Template10,
    template11: Template11,
  };

  const TemplateComp = templateMap[templateId] || null;

  return (
    <div>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>{resume.name} - {resume.role} | ApnaFolio</title>
        <meta name="description" content={resume.summary?.slice(0, 150)} />
        <meta name="keywords" content={`${resume.name}, ${resume.role}, portfolio, ApnaFolio`} />
        <meta property="og:title" content={`${resume.name} - ${resume.role}`} />
        <meta property="og:description" content={resume.summary} />
        <meta property="og:image" content={resume.contact?.photo || "/default-avatar.png"} />
      </Helmet>

      {TemplateComp ? <TemplateComp data={resume} /> : <p>No template selected</p>}
    </div>
  );
}
