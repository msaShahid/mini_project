import { Request, Response, NextFunction } from "express";
import postService from "../service/post.service.js";
import mongoose from "mongoose";
import { broadcast } from "../server.js";

// Data transfer object for post creation/update 
export interface PostDTO {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  images?: string[];
  tag?: mongoose.Types.ObjectId[];
  likesCount?: number;
  status?: string;
}

const postController = {

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await postService.postList();
      res.status(200).json({
        success: true,
        message: 'Post List retrieved successfully.',
        data,
      })
    } catch (error) {
      next(error)
    }
  },

  userPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'User not authorized' })

      const data = await postService.postFindByUserId(userId);
      res.status(200).json({
        success: true,
        message: 'Posts retrieved for current user.',
        data,
      })
    } catch (error) {
      next(error);
    }
  },

  getPostByid: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = await postService.postFindById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Post not found.'
        })
      }

      res.status(200).json({
        success: true,
        message: 'Post retrieved successfully.',
        data
      })
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'User not authorized' })

     // const newData: PostDTO = req.body;
      const files = req.files as Express.Multer.File[];

      const images = files?.map((file) => {
        // store relative path (recommended)
        return `uploads/posts/${file.filename}`;
      });

      const newData = {
        ...req.body,
        images, 
      };
      const data = await postService.postCreate(userId, newData);

      res.status(201).json({
        success: true,
        message: 'Post Create Successfully.',
        data,
      })

      broadcast({ type: "create", post: data });

    } catch (error) {
      next(error)
    }
  },

  update: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const newData: Partial<PostDTO> = req.body;

      const data = await postService.postUpdate(id, newData);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Post not found.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Post Update Successfully.',
        data,
      })

    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          success: false,
          message: 'Data not found.'
        })
      }

      const data = await postService.postDelete(id);
      res.status(200).json({
        success: true,
        message: 'Post delete successfully.',
        data
      })
    } catch (error) {
      next(error);
    }
  }
}

export default postController;