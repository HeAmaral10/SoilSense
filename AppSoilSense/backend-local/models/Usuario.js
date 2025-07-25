import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String
});

export default mongoose.model('Usuario', UsuarioSchema);
