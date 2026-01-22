'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">🌟 The Happy Place</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link href="/assistive-hub" className="hover:text-blue-200 transition-colors">
                Assistive Hub
              </Link>
              <Link href="/child-learning" className="hover:text-blue-200 transition-colors">
                Child Learning
              </Link>
              <Link href="/inclusion-learning" className="hover:text-blue-200 transition-colors">
                Inclusion Learning
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Welcome, {user.email?.split('@')[0]}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-20 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        mode={authMode}
      />
    </>
  );
}
