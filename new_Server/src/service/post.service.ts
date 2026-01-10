import Post, { IPost } from '../models/post.model.js'

const postService = {

    async postList(): Promise<IPost[]> {
        return await Post.find()
            .populate("userId", "name email -_id")
            .select("-__v -updatedAt")
            .sort({ createdAt: -1 });
    },

    async postFindByUserId(userId: string): Promise<IPost[]> {
        return await Post.find({ userId: userId }).sort({ createdAt: -1 });
    },

    async postFindById(id: string): Promise<IPost | null> {
        return await Post.findById(id);
    },

    async postCreate(userId: string, data: Partial<IPost>): Promise<IPost> {
        return await Post.create({ ...data, userId });
    },

    async postUpdate(id: string, data: Partial<IPost>): Promise<IPost | null> {
        return await Post.findByIdAndUpdate(id, data, { new: true });
    },

    async postDelete(id: string): Promise<IPost | null> {
        return await Post.findByIdAndDelete(id);
    }
}

export default postService;