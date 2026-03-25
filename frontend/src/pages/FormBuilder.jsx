import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Save, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { formAPI } from '../services/api';
import QuestionInput from '../components/QuestionInput';

const FormBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchForm();
    }
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await formAPI.getForm(id);
      setFormData(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load form');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: 'short_answer',
      title: '',
      required: false,
      options: [],
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = updatedQuestion;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleDuplicateQuestion = (index) => {
    const questionToDuplicate = formData.questions[index];
    const duplicatedQuestion = {
      ...questionToDuplicate,
      id: uuidv4(),
    };
    const updatedQuestions = [
      ...formData.questions.slice(0, index + 1),
      duplicatedQuestion,
      ...formData.questions.slice(index + 1),
    ];
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title.trim()) {
        setError('Form title is required');
        return;
      }

      if (id) {
        await formAPI.updateForm(id, formData);
        setSuccess('Form updated successfully');
      } else {
        const response = await formAPI.createForm(formData);
        setSuccess('Form created successfully');
        setTimeout(() => {
          navigate(`/edit/${response.data.data._id}`);
        }, 1000);
      }
      setError('');
    } catch (err) {
      setError('Failed to save form');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-600 mt-4">Loading form...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {error && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-600">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg"
        >
          <p className="text-green-600">{success}</p>
        </motion.div>
      )}

      <form onSubmit={handleSaveForm} className="card mb-6">
        <h1 className="text-3xl font-bold mb-6">
          {id ? 'Edit Form' : 'Create New Form'}
        </h1>

        <div className="mb-6">
          <label className="form-label">Form Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Customer Feedback Survey"
            className="form-input"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Add a description (optional)"
            rows="3"
            className="form-input"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save size={18} />
            Save Form
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Questions</h2>
          <button
            onClick={handleAddQuestion}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add Question
          </button>
        </div>

        <AnimatePresence>
          {formData.questions.map((question, index) => (
            <QuestionInput
              key={question.id}
              question={question}
              onChange={(updatedQuestion) =>
                handleQuestionChange(index, updatedQuestion)
              }
              onDuplicate={() => handleDuplicateQuestion(index)}
              onDelete={() => handleDeleteQuestion(index)}
            />
          ))}
        </AnimatePresence>

        {formData.questions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 card"
          >
            <p className="text-gray-600 mb-4">No questions yet</p>
            <button
              onClick={handleAddQuestion}
              className="btn-primary"
            >
              Add First Question
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
