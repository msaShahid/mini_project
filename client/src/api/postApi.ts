import { CreatePostPayload, Post, PostListResponse, PostResponse } from "../types/Post";
import { AuthApi } from "./axiosClient";
import { endpoints } from "./endpoints";

export const postApi = {
  
  async createPost(data: CreatePostPayload): Promise<Post> {
    const response = await AuthApi.post<PostResponse>(endpoints.post.create, data);
    return response.data.data;
  },

  async getAllPosts(): Promise<Post[]> {
    const response = await AuthApi.get<PostListResponse>(endpoints.post.list);
    return response.data.data;
  },

  async getPostById(id: string): Promise<Post> {
    const response = await AuthApi.get<PostResponse>(endpoints.post.getById(id));
    return response.data.data;
  },

  async getMyPosts(): Promise<Post[]> {
    const response = await AuthApi.get<PostListResponse>(endpoints.post.userPost);
    return response.data.data;
  },

  async updatePost(id: string, data: Partial<CreatePostPayload>): Promise<Post> {
    const response = await AuthApi.put<PostResponse>(endpoints.post.update(id), data);
    return response.data.data;
  },

  async deletePost(id: string): Promise<Post> {
    const response = await AuthApi.delete<PostResponse>(endpoints.post.delete(id));
    return response.data.data;
  }
};
