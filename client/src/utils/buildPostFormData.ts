import { CreatePostPayload } from "../types/Post";

export const buildPostFormData = (data: CreatePostPayload): FormData => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("status", data.status ?? "draft");

  data.images?.forEach(file =>
    formData.append("images", file, file.name)
  );

  data.tag?.forEach(tag =>
    formData.append("tag", tag)
  );

  return formData;
};
