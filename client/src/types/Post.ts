export interface Post {
  _id: string;
  userId: string;
  name: string;
  description: string;
  images: string[];
  tag: string[];
  likesCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  name: string;
  description: string;
  images: File[];
  tag: string[];
  status?: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data: Post;
}

export interface PostListResponse {
  success: boolean;
  message: string;
  data: Post[];
}
