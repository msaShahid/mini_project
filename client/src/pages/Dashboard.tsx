import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/redux/hooks";
import { fetchPosts, deletePost } from "../store/redux/slices/postSlice";
import { Post } from "../types/Post";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal } from "../components/common/Modal";
import PostForm from "../components/posts/PostForm"; // reusable form for create/edit
import StatSkeleton from "../components/dashboard/StatSkeleton";
import Stat from "../components/dashboard/Stat";
import Td from "../components/common/Table/Td";
import Th from "../components/common/Table/Th";

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

  const { publishedCount, draftCount } = useMemo(() => {
    let published = 0;
    let draft = 0;

    for (const post of posts) {
      if (post.status === "active") published++;
      if (post.status === "draft") draft++;
    }

    return { publishedCount: published, draftCount: draft };
  }, [posts]);

  const totalCount =  posts.length || 0;

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

        {loading && <p className="text-gray-500 text-center">Loading posts...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          ) : (
            <>
              <Stat title="Total Posts" value={totalCount} />
              <Stat title="Published" value={publishedCount} color="text-green-600" />
              <Stat title="Drafts" value={draftCount} color="text-yellow-500" />
            </>
          )}
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition">
                  <Td>
                    <h4 className={`font-medium ${post.status === "Draft" ? "text-gray-600" : "text-gray-900"}`}>
                      {post.name}
                    </h4>
                  </Td>
                  <Td className="max-w-md line-clamp-2">{post.description}</Td>
                  <Td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${post.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {post.status === "active" ? "Published" : "Draft"}
                    </span>
                  </Td>

                  <Td className="text-right">
                    <div className="flex justify-end space-x-4">
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
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
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
