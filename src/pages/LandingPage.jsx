import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { getPosts } from '../utils/storage';
import PublicNavbar from '../components/PublicNavbar';
import BlogCard from '../components/BlogCard';

export default function LandingPage() {
  const session = getCurrentUser();
  const recentPosts = getPosts().slice(0, 3);

  const features = [
    {
      icon: '✍️',
      title: 'Write',
      description: 'Express your thoughts with our clean and intuitive writing experience. Create beautiful blog posts effortlessly.',
    },
    {
      icon: '⚙️',
      title: 'Manage',
      description: 'Organize and manage your content with ease. Edit, update, or remove posts anytime you need.',
    },
    {
      icon: '🌍',
      title: 'Share',
      description: 'Share your stories with the world. Connect with readers and build your audience on WriteSpace.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {session ? (
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link to="/blogs" className="text-xl font-bold text-indigo-600">
                  WriteSpace
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/blogs"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Go to Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PublicNavbar />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to WriteSpace
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
            A beautiful space to write, share, and discover stories. Join our community of writers and readers today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {session ? (
              <Link
                to="/blogs"
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md text-lg font-semibold shadow-lg transition-colors duration-200"
              >
                Go to Blogs
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md text-lg font-semibold shadow-lg transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold transition-colors duration-200"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why WriteSpace?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Everything you need to start your blogging journey, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-8 text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mx-auto mb-5">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Posts
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover what our community has been writing about.
            </p>
          </div>
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} currentUser={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No posts yet. Be the first to share your story!
              </p>
              {!session && (
                <Link
                  to="/register"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Get Started
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">WriteSpace</span>
              <p className="text-sm mt-1">
                &copy; {new Date().getFullYear()} WriteSpace. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              {session ? (
                <>
                  <Link to="/blogs" className="text-sm hover:text-white transition-colors duration-200">
                    Blogs
                  </Link>
                  <Link to="/write" className="text-sm hover:text-white transition-colors duration-200">
                    Write
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm hover:text-white transition-colors duration-200">
                    Login
                  </Link>
                  <Link to="/register" className="text-sm hover:text-white transition-colors duration-200">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}