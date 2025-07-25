import mongoose from 'mongoose';

const DadoSensorSchema = new mongoose.Schema({
  umidade: Number,
  temperatura: Number,
  luminosidade: Number,
  planta: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('DadoSensor', DadoSensorSchema);
