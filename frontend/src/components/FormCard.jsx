import React from 'react';
import { Eye, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FormCard = ({ form }) => {
  const responsesUrl = `/responses/${form._id}`;
  const viewUrl = `/form/${form._id}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card cursor-pointer transition-shadow hover:shadow-lg"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{form.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{form.description}</p>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        <p>{form.questions.length} questions</p>
        <p>Created {new Date(form.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-2">
        <Link to={viewUrl} className="flex-1 btn-primary text-center flex items-center justify-center gap-2">
          <Eye size={18} />
          View
        </Link>
        <Link to={responsesUrl} className="flex-1 btn-secondary text-center flex items-center justify-center gap-2">
          <BarChart3 size={18} />
          Responses
        </Link>
      </div>
    </motion.div>
  );
};

export default FormCard;
