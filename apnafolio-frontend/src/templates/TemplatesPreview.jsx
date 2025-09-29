import { useParams } from "react-router-dom";
import dummyResume from "../constants/dummyResume";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";
import Template7 from "../templates/Template7";
import Template8 from "../templates/Template8";
import Template9 from "../templates/Template9";
import Template10 from "../templates/Template10";
import Template11 from "../templates/Template11";


export default function TemplatePreview() {
  const { templateId } = useParams();

  const renderTemplate = () => {
    switch (templateId) {
      case "template1": return <Template1 data={dummyResume} />;
      case "template2": return <Template2 data={dummyResume} />;
      case "template3": return <Template3 data={dummyResume} />;
      case "template4": return <Template4 data={dummyResume} />;
      case "template5": return <Template5 data={dummyResume} />;
      case "template6": return <Template6 data={dummyResume} />;
      case "template7": return <Template7 data={dummyResume} />;
      case "template8": return <Template8 data={dummyResume} />;
      case "template9": return <Template9 data={dummyResume} />;
      case "template10": return <Template10 data={dummyResume} />;
      case "template11": return <Template11 data={dummyResume} />;
      default: return <h2>Template not found</h2>;
    }
  };

  return <div>{renderTemplate()}</div>;
}


// import { useParams, Link } from "react-router-dom";
// import dummyResume from "../constants/dummyResume";
// import Template1 from "../templates/Template1";
// import Template2 from "../templates/Template2";
// import Template3 from "../templates/Template3";
// import Template4 from "../templates/Template4";
// import Template5 from "../templates/Template5";
// import Template6 from "../templates/Template6";
// import Template7 from "../templates/Template7";
// import Template8 from "../templates/Template8";
// import Template9 from "../templates/Template9";
// import Template10 from "../templates/Template10";
// import Template11 from "../templates/Template11";
// import "./TemplatesPreview.css";

// export default function TemplatesPreview() {
//   const { templateId } = useParams();

//   const renderTemplate = () => {
//     switch (templateId) {
//       case "template1": return <Template1 data={dummyResume} />;
//       case "template2": return <Template2 data={dummyResume} />;
//       case "template3": return <Template3 data={dummyResume} />;
//       case "template4": return <Template4 data={dummyResume} />;
//       case "template5": return <Template5 data={dummyResume} />;
//       case "template6": return <Template6 data={dummyResume} />;
//       case "template7": return <Template7 data={dummyResume} />;
//       case "template8": return <Template8 data={dummyResume} />;
//       case "template9": return <Template9 data={dummyResume} />;
//       case "template10": return <Template10 data={dummyResume} />;
//       case "template11": return <Template11 data={dummyResume} />;
//       default: return <h2>Template not found</h2>;
//     }
//   };

//   return (
//     <div className="template-preview-page">
//       <div className="preview-left">
//         {renderTemplate()}
//       </div>
//       <div className="preview-right">
//         <h2>Template Preview</h2>
//         <p>This is a demo preview with dummy data.</p>
//         <Link to="/login" className="btn btn-primary">
//           Login to Buy
//         </Link>
//         <Link to="/register" className="btn btn-secondary">
//           Register Now
//         </Link>
//       </div>
//     </div>
//   );
// }
