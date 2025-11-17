import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { fetchPosts, deletePost } from "../store/redux/slices/postSlice";
import { Post } from "../types/Post";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal } from "../components/common/Modal";
import PostForm from "../components/posts/PostForm"; // reusable form for create/edit

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    setSelectedPost(null); 
    setFormOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setFormOpen(true);
  };

  const openDeleteModal = (post: Post) => {
    setSelectedPost(post);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      dispatch(deletePost(selectedPost._id));
      setDeleteOpen(false);
      setSelectedPost(null);
    }
  };

  const publishedCount = posts.filter((p) => p.status === "active").length;
  const draftCount = posts.filter((p) => p.status === "Draft").length;

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <header className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">
              Here's an overview of your posts
            </p>
          </div>
          <button
            onClick={handleAddPost}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Post</span>
          </button>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Total Posts</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">{posts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Published</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">{publishedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-700">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">{draftCount}</p>
          </div>
        </div>


        {loading && <p className="text-gray-500 text-center">Loading posts...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <h4
                  className={`text-xl font-semibold mb-2 ${
                    post.status === "Draft" ? "text-gray-600" : "text-gray-900"
                  }`}
                >
                  {post.name}
                </h4>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    post.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status === "active" ? "Published" : "Draft"}
                </span>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Post"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(post)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Post"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        title="Confirm Delete"
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete this post? This action cannot be undone.
      </Modal>

      {/* Create/Edit Post Modal */}
      {isFormOpen && (
        <PostForm
          post={selectedPost}
          isOpen={isFormOpen}
          onClose={() => setFormOpen(false)}
        />
      )}
    </section>
  );
};

export default Dashboard;
