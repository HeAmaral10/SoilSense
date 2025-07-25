import mongoose from 'mongoose';

const PlantaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

export default mongoose.model('Planta', PlantaSchema);
