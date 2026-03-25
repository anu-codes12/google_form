import React from 'react';
import { Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionInput = ({ question, onChange, onDuplicate, onDelete }) => {
  const handleTitleChange = (e) => {
    onChange({ ...question, title: e.target.value });
  };

  const handleTypeChange = (e) => {
    onChange({ ...question, type: e.target.value, options: [] });
  };

  const handleRequiredChange = (e) => {
    onChange({ ...question, required: e.target.checked });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = { ...updatedOptions[index], text: value };
    onChange({ ...question, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOption = { id: Date.now().toString(), text: '' };
    onChange({ ...question, options: [...question.options, newOption] });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = question.options.filter((_, i) => i !== index);
    onChange({ ...question, options: updatedOptions });
  };

  const hasOptions = ['multiple_choice', 'checkboxes', 'dropdown'].includes(
    question.type
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card mb-4 border-l-4 border-indigo-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <label className="form-label">Question Title</label>
          <input
            type="text"
            value={question.title}
            onChange={handleTitleChange}
            placeholder="Enter question title"
            className="form-input"
          />
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onDuplicate}
            className="btn-secondary"
            title="Duplicate question"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={onDelete}
            className="btn-danger"
            title="Delete question"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label">Question Type</label>
          <select
            value={question.type}
            onChange={handleTypeChange}
            className="form-input"
          >
            <option value="short_answer">Short Answer</option>
            <option value="paragraph">Paragraph</option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="checkboxes">Checkboxes</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={question.required}
              onChange={handleRequiredChange}
              className="w-4 h-4 text-indigo-600"
            />
            <span className="ml-2 text-sm text-gray-700">Required</span>
          </label>
        </div>
      </div>

      {hasOptions && (
        <div className="mb-4">
          <label className="form-label">Options</label>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={option.id} className="flex gap-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="form-input"
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="btn-danger"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddOption}
            className="btn-secondary mt-2"
          >
            Add Option
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionInput;
