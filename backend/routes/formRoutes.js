import express from 'express';
import {
  createForm,
  getForm,
  updateForm,
  getAllForms,
  deleteForm,
} from '../controllers/formController.js';

const router = express.Router();

router.post('/forms', createForm);
router.get('/forms', getAllForms);
router.get('/forms/:id', getForm);
router.put('/forms/:id', updateForm);
router.delete('/forms/:id', deleteForm);

export default router;
