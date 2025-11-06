import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} ShopIntelli. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-gray-700" href="#">Privacy</a>
          <a className="hover:text-gray-700" href="#">Terms</a>
          <a className="hover:text-gray-700" href="#">Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
