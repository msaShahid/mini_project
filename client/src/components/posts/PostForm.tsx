import React, { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import { Post } from "../../types/Post";
import { useAppDispatch } from "../../store/redux/hooks";
import { createPost, updatePost } from "../../store/redux/slices/postSlice";

interface PostFormProps {
  post?: Post | null; 
  isOpen: boolean;
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(post?.name || "");
  const [description, setDescription] = useState(post?.description || "");
  const [status, setStatus] = useState(post?.status || "Draft");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset form when opening modal
    if (post) {
      setName(post.name);
      setDescription(post.description);
      setStatus(post.status);
    } else {
      setName("");
      setDescription("");
      setStatus("Draft");
    }
  }, [post, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (post) {
        // Update
        await dispatch(updatePost({ id: post._id, data: { name, description, status } }));
      } else {
        // Create
        await dispatch(createPost({
            name, description, status,
            images: [],
            tag: []
        }));
      }
      onClose();
    } catch (err) {
      console.error("Failed to save post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={post ? "Edit Post" : "Create Post"}
      onClose={onClose}
      confirmText={post ? "Update" : "Create"}
      cancelText="Cancel"
      onConfirm={handleSubmit}
      disabled={loading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

export default PostForm;
