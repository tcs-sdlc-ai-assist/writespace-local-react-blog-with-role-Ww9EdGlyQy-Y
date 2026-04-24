import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BlogCard from '../components/BlogCard';
import { getCurrentUser } from '../utils/auth';
import { getPosts } from '../utils/storage';

export default function Home() {
  const currentUser = getCurrentUser();
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
            <p className="text-gray-600 mt-1">
              Discover what our community has been writing about.
            </p>
          </div>
          <Link
            to="/write"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Write New Post
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} currentUser={currentUser} />
            ))}
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
  );
}