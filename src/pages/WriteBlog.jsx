import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCurrentUser } from '../utils/auth';
import { getPosts, addPost, editPost } from '../utils/storage';

export default function WriteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const TITLE_MAX = 100;
  const CONTENT_MAX = 5000;

  useEffect(() => {
    if (isEditMode) {
      const posts = getPosts();
      const post = posts.find((p) => p.id === id);

      if (!post) {
        navigate('/blogs', { replace: true });
        return;
      }

      const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.userId === post.authorId);

      if (!canEdit) {
        navigate('/blogs', { replace: true });
        return;
      }

      setTitle(post.title);
      setContent(post.content);
    }
  }, [id, isEditMode, currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (title.trim().length > TITLE_MAX) {
      setError(`Title must be ${TITLE_MAX} characters or less.`);
      return;
    }

    if (!content.trim()) {
      setError('Content is required.');
      return;
    }

    if (content.trim().length > CONTENT_MAX) {
      setError(`Content must be ${CONTENT_MAX} characters or less.`);
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        const success = editPost(id, {
          title: title.trim(),
          content: content.trim(),
        });

        if (!success) {
          setError('Failed to update post. Post may have been deleted.');
          setLoading(false);
          return;
        }

        navigate(`/blog/${id}`);
      } else {
        const postId = crypto.randomUUID();
        const post = {
          id: postId,
          title: title.trim(),
          content: content.trim(),
          createdAt: new Date().toISOString(),
          authorId: currentUser.userId,
          authorName: currentUser.displayName,
          authorRole: currentUser.role,
        };

        addPost(post);
        navigate(`/blog/${postId}`);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Post' : 'Write New Post'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditMode
              ? 'Update your post below.'
              : 'Share your thoughts with the community.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <span className={`text-xs ${title.length > TITLE_MAX ? 'text-red-600' : 'text-gray-400'}`}>
                  {title.length}/{TITLE_MAX}
                </span>
              </div>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <span className={`text-xs ${content.length > CONTENT_MAX ? 'text-red-600' : 'text-gray-400'}`}>
                  {content.length}/{CONTENT_MAX}
                </span>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content here..."
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y"
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? isEditMode
                    ? 'Updating...'
                    : 'Publishing...'
                  : isEditMode
                    ? 'Update Post'
                    : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}