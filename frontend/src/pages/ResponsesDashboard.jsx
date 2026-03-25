import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formAPI, responseAPI } from '../services/api';

const ResponsesDashboard = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [formId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [formResponse, responsesResponse] = await Promise.all([
        formAPI.getForm(formId),
        responseAPI.getFormResponses(formId),
      ]);
      setForm(formResponse.data.data);
      setResponses(responsesResponse.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load responses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (responses.length === 0) {
      alert('No responses to download');
      return;
    }

    const headers = ['Submitted At', ...form.questions.map((q) => q.title)];
    const csvContent = [
      headers.join(','),
      ...responses.map((response) => {
        const row = [new Date(response.createdAt).toLocaleString()];
        form.questions.forEach((question) => {
          const answer = response.answers.find(
            (a) => a.questionId === question.id
          );
          row.push(
            answer?.value ? JSON.stringify(answer.value).replace(/"/g, '""') : ''
          );
        });
        return row.join(',');
      }),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.title}-responses.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-600 mt-4">Loading responses...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center"
        >
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Form not found</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 btn-secondary mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="card mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
              <p className="text-gray-600 mt-2">{form.description}</p>
            </div>
            {responses.length > 0 && (
              <button
                onClick={downloadCSV}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={18} />
                Download CSV
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-600 text-sm font-semibold">Total Responses</p>
              <p className="text-2xl font-bold text-blue-900">{responses.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-600 text-sm font-semibold">Questions</p>
              <p className="text-2xl font-bold text-green-900">{form.questions.length}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-600 text-sm font-semibold">Created</p>
              <p className="text-sm font-bold text-purple-900">
                {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-600">{error}</p>
        </motion.div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">Responses</h2>

        {responses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center"
          >
            <p className="text-gray-600 mb-4">No responses yet</p>
            <button
              onClick={() => navigate(`/form/${formId}`)}
              className="btn-primary"
            >
              Fill Form
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {responses.map((response, index) => (
              <motion.div
                key={response._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(response.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  {form.questions.map((question) => {
                    const answer = response.answers.find(
                      (a) => a.questionId === question.id
                    );

                    return (
                      <div key={question.id}>
                        <p className="font-semibold text-gray-800 mb-2">
                          {question.title}
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-gray-700">
                          {Array.isArray(answer?.value)
                            ? answer.value.join(', ')
                            : answer?.value || '(No answer)'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResponsesDashboard;
