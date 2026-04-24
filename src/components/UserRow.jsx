import React from 'react';
import Avatar from './Avatar';

export default function UserRow({ user, currentUser, onDelete }) {
  const isAdmin = user.username === 'admin';
  const isSelf = currentUser && currentUser.userId === user.id;
  const canDelete = !isAdmin && !isSelf;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const roleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
        User
      </span>
    );
  };

  return (
    <>
      {/* Desktop: table row */}
      <tr className="hidden md:table-row hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-3">
            <Avatar role={user.role} />
            <div>
              <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {roleBadge(user.role)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.createdAt ? formatDate(user.createdAt) : '—'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          {canDelete && (
            <button
              onClick={() => onDelete(user.id)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          )}
        </td>
      </tr>

      {/* Mobile: card */}
      <div className="md:hidden bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border-l-4 border-indigo-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar role={user.role} />
            <div>
              <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </div>
          </div>
          {roleBadge(user.role)}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-400 text-xs">
            {user.createdAt ? formatDate(user.createdAt) : '—'}
          </span>
          {canDelete && (
            <button
              onClick={() => onDelete(user.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}