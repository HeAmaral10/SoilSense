import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar: ' + error.message });
  }
}

export async function loginUsuario(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida' });

    const token = jwt.sign({ id: usuario._id }, 'chave-secreta', { expiresIn: '7d' });

    res.status(200).json({ usuario: { nome: usuario.nome, email: usuario.email }, token });
  } catch (error) {
    res.status(500).json({ erro: 'Erro no login' });
  }
}
