import express from 'express';
import {
  submitResponse,
  getFormResponses,
  getResponseCount,
} from '../controllers/responseController.js';

const router = express.Router();

router.post('/responses', submitResponse);
router.get('/responses/:formId', getFormResponses);
router.get('/responses/:formId/count', getResponseCount);

export default router;
