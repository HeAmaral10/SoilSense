import express from 'express';
import { registrarDado, listarDados } from '../controllers/dadosController.js';

const router = express.Router();

router.post('/', registrarDado);
router.get('/', listarDados);

export default router;
