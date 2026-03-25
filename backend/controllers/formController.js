import Form from '../model/Form.js';

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, description, questions, createdBy } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Form title is required' });
    }

    const newForm = new Form({
      title,
      description,
      questions: questions || [],
      createdBy: createdBy || 'anonymous',
    });

    await newForm.save();
    res.status(201).json({ success: true, data: newForm });
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error: error.message });
  }
};

// Get a specific form
export const getForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
};

// Update a form
export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, questions, isActive } = req.body;

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, description, questions, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ success: true, data: updatedForm });
  } catch (error) {
    res.status(500).json({ message: 'Error updating form', error: error.message });
  }
};

// Get all forms (for listing)
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

// Delete a form
export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ success: true, message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting form', error: error.message });
  }
};
