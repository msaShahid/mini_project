import { createUploader } from "../utils/uploadBuilder.js";

export const uploadPost = createUploader({
  folder: "posts",
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB: 10,
});
