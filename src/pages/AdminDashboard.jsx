import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import Avatar from '../components/Avatar';
import { getCurrentUser } from '../utils/auth';
import { getPosts, getUsers, deletePost } from '../utils/storage';

export default function AdminDashboard() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const posts = getPosts();
  const users = getUsers();
  const adminPosts = posts.filter((p) => p.authorId === currentUser.userId);
  const recentPosts = posts.slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
      setShowConfirm(false);
      setPostToDelete(null);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirm(false);
    setPostToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Welcome back, {currentUser.displayName}! 👋
          </h1>
          <p className="text-indigo-100 text-lg">
            Here's an overview of your WriteSpace community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value={posts.length}
            icon="📝"
            color="indigo"
          />
          <StatCard
            title="Total Users"
            value={users.length}
            icon="👥"
            color="violet"
          />
          <StatCard
            title="Your Posts"
            value={adminPosts.length}
            icon="✍️"
            color="green"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/write"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Write New Post
            </Link>
            <Link
              to="/users"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Manage Users
            </Link>
            <Link
              to="/blogs"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
            >
              View All Posts
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h2>
          {recentPosts.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-base font-semibold text-gray-900 hover:text-indigo-600 line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <div className="flex items-center space-x-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <Avatar role={post.authorRole || 'user'} />
                            <span className="text-gray-700 text-sm font-medium">
                              {post.authorName}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
                        <Link
                          to={`/edit/${post.id}`}
                          className="inline-flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
                          title="Edit post"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(post)}
                          className="inline-flex items-center text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mx-auto mb-5">
                <span className="text-3xl">✍️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No posts yet
              </h2>
              <p className="text-gray-500 text-lg mb-6">
                Be the first to share your story with the community!
              </p>
              <Link
                to="/write"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Write Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <span className="text-2xl">🗑️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Post
            </h3>
            <p className="text-gray-600 text-sm text-center mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}