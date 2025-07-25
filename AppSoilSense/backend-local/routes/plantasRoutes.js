import express from 'express';
import { listarPlantas } from '../controllers/plantasController.js';

const router = express.Router();
router.get('/', listarPlantas);

export default router;
