const dummyResume = {
  name: "Johnathan Michael Doe",
  role: "Full Stack Web Developer",
  summary: `I am a passionate developer with a strong background in building scalable web applications 
  and interactive user experiences. Over the past 3 years, I have worked on multiple MERN stack 
  projects, cloud integrations, and responsive UIs. I love solving challenging problems and 
  continuously learning new technologies.`,

  contact: {
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    location: "Pune, India",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
    photo: "https://i.pravatar.cc/150?img=12"
  },

  frontendSkills: ["React", "Next.js", "Redux", "HTML", "CSS", "Tailwind", "Framer Motion"],
  backendSkills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"],
  tools: ["Git", "Docker", "Figma", "Postman", "VSCode"],
  programmingLanguages: ["JavaScript", "TypeScript", "Python", "C++"],

  projects: [
    {
      title: "E-Commerce Platform",
      description: `Developed a scalable MERN stack ecommerce platform with authentication, 
      cart management, and integrated payment gateway. Used Redux for state management 
      and deployed on AWS.`,
      tags: ["React", "MongoDB", "Node.js", "AWS"],
      link: "https://shopdemo.com",
      github: "https://github.com/johndoe/ecommerce",
      image: "/projects/ecommerce.png",
      video: "/projects/ecommerce.mp4",
      document: "/projects/ecommerce.pdf"
    },
    {
      title: "AI Chatbot",
      description: `Built a customer support chatbot using Dialogflow and Node.js backend, 
      integrated with WhatsApp Business API.`,
      tags: ["Node.js", "Dialogflow", "API"],
      github: "https://github.com/johndoe/chatbot",
      video: "/projects/chatbot.mp4"
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science",
      school: "Savitribai Phule Pune University",
      year: "2025"
    },
    {
      degree: "Higher Secondary (Science)",
      school: "Modern College, Pune",
      year: "2021"
    }
  ],

  experience: [
    {
      title: "Full Stack Intern",
      company: "TCS",
      duration: "Jan 2024 – Jun 2024",
      document: "/experience/tcs.pdf"
    },
    {
      title: "Frontend Developer Intern",
      company: "Startup XYZ",
      duration: "May 2023 – Aug 2023"
    }
  ],

  certifications: [
    { name: "AWS Cloud Practitioner", document: "/certs/aws.pdf" },
    { name: "Google UX Design", document: "/certs/googleux.pdf" }
  ],

  resumeFile: "/resume/johndoe.pdf"
};

export default dummyResume;