import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formAPI, responseAPI } from '../services/api';
import QuestionPreview from '../components/QuestionPreview';

const FormViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await formAPI.getForm(id);
      setForm(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load form');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
    // Clear error for this question
    if (errors[questionId]) {
      const newErrors = { ...errors };
      delete newErrors[questionId];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    form.questions.forEach((question) => {
      if (question.required) {
        const answer = answers[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          newErrors[question.id] = true;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const formattedAnswers = form.questions.map((question) => ({
        questionId: question.id,
        questionType: question.type,
        value: answers[question.id] || '',
      }));

      await responseAPI.submitResponse({
        formId: id,
        answers: formattedAnswers,
      });

      setSuccess(true);
      setAnswers({});
      setError('');

      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
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

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center"
        >
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Form not found</h2>
          <p className="text-gray-600 mb-4">The form you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{form.title}</h1>
        {form.description && (
          <p className="text-gray-600 text-lg">{form.description}</p>
        )}
      </motion.div>

      {success && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg"
        >
          <p className="text-green-600 font-semibold">
            ✓ Form submitted successfully! Redirecting...
          </p>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-600">{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        {form.questions.map((question) => (
          <QuestionPreview
            key={question.id}
            question={question}
            answer={answers[question.id]}
            onChange={handleAnswerChange}
            errors={errors}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting || success}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-white ${
            submitting || success
              ? 'bg-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : success ? (
            <> Submitted ✓</>
          ) : (
            <>
              <Send size={20} />
              Submit
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default FormViewer;
