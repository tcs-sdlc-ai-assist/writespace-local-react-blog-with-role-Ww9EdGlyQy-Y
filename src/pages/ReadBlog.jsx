import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';
import { getCurrentUser } from '../utils/auth';
import { getPosts, deletePost } from '../utils/storage';

export default function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [showConfirm, setShowConfirm] = useState(false);

  const posts = getPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-5">
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Post not found
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/blogs"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.userId === post.authorId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/blogs');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/blogs"
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blogs
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar role={post.authorRole || 'user'} />
                <div>
                  <span className="text-gray-700 text-sm font-medium">
                    {post.authorName}
                  </span>
                  <p className="text-gray-400 text-xs">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
              {canEdit && (
                <div className="flex items-center space-x-3">
                  <Link
                    to={`/edit/${post.id}`}
                    className="inline-flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
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
                    onClick={() => setShowConfirm(true)}
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
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
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
                onClick={() => setShowConfirm(false)}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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