import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, Plus } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
            <FileText size={28} />
            FormHub
          </Link>

          <div className="flex gap-4 items-center">
            <Link to="/" className="flex items-center gap-2 btn-secondary">
              <FileText size={18} />
              My Forms
            </Link>
            <Link to="/create" className="flex items-center gap-2 btn-primary">
              <Plus size={18} />
              Create Form
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
