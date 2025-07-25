import Planta from '../models/Planta.js';

export async function listarPlantas(req, res) {
  try {
    const plantas = await Planta.find();
    res.status(200).json(plantas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar plantas' });
  }
}
