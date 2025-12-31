// // src/utils/cloudinaryUpload.js
// // import axios from "axios";

// // export const uploadFile = async (file) => {
// //   const formData = new FormData();
// //   formData.append("file", file);
// //   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

// //   const res = await axios.post(
// //     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/${
// //       isPdf ? "raw" : "image"
// //     }/upload`,
// //     formData
// //   );

// //   // const res = await axios.post(
// //   //   `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/upload`,
// //   //   formData
// //   // );
// //   return res.data.secure_url;
// // };


// // import axios from "axios";

// // export const uploadFile = async (file) => {
// //   const formData = new FormData();
// //   formData.append("file", file);
// //   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  
// //   const isDocument =
// //     file.type === "application/pdf" ||
// //     file.type.includes("officedocument") ||
// //     file.type === "application/msword";

// //   const uploadType = isDocument ? "raw" : "image";

// //   const res = await axios.post(
// //     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/${uploadType}/upload`,
// //     formData
// //   );

// //   return res.data.secure_url;
// // };



// import axios from "axios";

// export const uploadFile = async (file) => {
//   if (!file) return null;
  
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  
//   // resource_type 'auto' mhanje PDF, Doc, Image sagla vyavasthit handle hota
//   try {
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/auto/upload`,
//       formData
//     );
//     return res.data.secure_url;
//   } catch (err) {
//     console.error("Cloudinary Upload Error:", err);
//     throw err;
//   }
// };

import axios from "axios";

export const uploadFile = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  const resourceType = isImage || isPDF ? "image" : "raw";

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/${resourceType}/upload`,
    formData
  );

  return res.data.secure_url;
};
