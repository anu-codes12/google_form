import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { formAPI } from '../services/api';
import FormCard from '../components/FormCard';

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await formAPI.getAllForms();
      setForms(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load forms. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = () => {
    navigate('/create');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Forms</h1>
        <button
          onClick={handleCreateForm}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create New Form
        </button>
      </div>

      {error && (
        <motion.div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-600">{error}</p>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading forms...</p>
        </div>
      ) : forms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 card"
        >
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No forms yet</h3>
          <p className="text-gray-600 mb-4">Create your first form to get started</p>
          <button
            onClick={handleCreateForm}
            className="btn-primary"
          >
            Create Form
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {forms.map((form) => (
            <FormCard key={form._id} form={form} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
