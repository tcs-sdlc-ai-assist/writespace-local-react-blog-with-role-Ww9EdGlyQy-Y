import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

export default function BlogCard({ post, currentUser }) {
  const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.userId === post.authorId);

  const truncateContent = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trimEnd() + '…';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-indigo-500 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/blog/${post.id}`} className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          {canEdit && (
            <Link
              to={`/edit/${post.id}`}
              className="ml-2 flex-shrink-0 text-gray-400 hover:text-indigo-600"
              title="Edit post"
            >
              <svg
                className="h-5 w-5"
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
            </Link>
          )}
        </div>
        <Link to={`/blog/${post.id}`}>
          <p className="text-gray-600 text-sm mb-4">
            {truncateContent(post.content)}
          </p>
        </Link>
        <div className="flex items-center justify-between">
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
    </div>
  );
}