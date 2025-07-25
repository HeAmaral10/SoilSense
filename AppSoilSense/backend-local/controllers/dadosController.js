import DadoSensor from '../models/DadoSensor.js';
import fs from 'fs';
import path from 'path';

export async function registrarDado(req, res) {
  try {
    const dado = await DadoSensor.create(req.body);
    res.status(201).json(dado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar dado' });
  }
}

export async function listarDados(req, res) {
  try {
    const dados = await DadoSensor.find().sort({ timestamp: -1 }).limit(10);

    if (dados.length > 0) {
      res.status(200).json(dados);
    } else {
      // Carrega os dados de exemplo manualmente
      const filePath = path.resolve('./data/exemploDados.json');
      const raw = fs.readFileSync(filePath);
      const exemploDados = JSON.parse(raw);
      res.status(200).json(exemploDados);
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  }
}
