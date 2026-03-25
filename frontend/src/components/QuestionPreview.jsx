import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionPreview = ({ question, answer, onChange, errors }) => {
  const [localAnswer, setLocalAnswer] = useState(answer || '');
  const [localAnswers, setLocalAnswers] = useState(
    Array.isArray(answer) ? answer : []
  );

  const handleTextChange = (e) => {
    setLocalAnswer(e.target.value);
    onChange(question.id, e.target.value);
  };

  const handleCheckboxChange = (optionText) => {
    let updated;
    if (localAnswers.includes(optionText)) {
      updated = localAnswers.filter((a) => a !== optionText);
    } else {
      updated = [...localAnswers, optionText];
    }
    setLocalAnswers(updated);
    onChange(question.id, updated);
  };

  const handleSelectChange = (e) => {
    setLocalAnswer(e.target.value);
    onChange(question.id, e.target.value);
  };

  const questionLabel = question.required ? (
    <>
      {question.title}
      <span className="text-red-500 ml-1">*</span>
    </>
  ) : (
    question.title
  );

  const isError = errors && errors[question.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card mb-6 ${isError ? 'border-l-4 border-red-500' : 'border-l-4 border-indigo-500'}`}
    >
      <label className={`form-label ${isError ? 'text-red-600' : ''}`}>
        {questionLabel}
      </label>

      {question.type === 'short_answer' && (
        <input
          type="text"
          value={localAnswer}
          onChange={handleTextChange}
          placeholder="Your answer"
          className={`form-input ${isError ? 'border-red-500' : ''}`}
        />
      )}

      {question.type === 'paragraph' && (
        <textarea
          value={localAnswer}
          onChange={handleTextChange}
          placeholder="Your answer"
          rows="4"
          className={`form-input ${isError ? 'border-red-500' : ''}`}
        />
      )}

      {question.type === 'multiple_choice' && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={option.text}
                checked={localAnswer === option.text}
                onChange={handleTextChange}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="ml-3 text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'checkboxes' && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localAnswers.includes(option.text)}
                onChange={() => handleCheckboxChange(option.text)}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="ml-3 text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'dropdown' && (
        <select
          value={localAnswer}
          onChange={handleSelectChange}
          className={`form-input ${isError ? 'border-red-500' : ''}`}
        >
          <option value="">Select an option</option>
          {question.options.map((option) => (
            <option key={option.id} value={option.text}>
              {option.text}
            </option>
          ))}
        </select>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {question.required && 'This field is required'}
        </p>
      )}
    </motion.div>
  );
};

export default QuestionPreview;
