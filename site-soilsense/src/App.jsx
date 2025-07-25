import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TelaInicial from './pages/TelaInicial';
import TelaCadastro from './pages/TelaCadastro';
import TelaPrincipal from './pages/TelaPrincipal';
import TelaGraficos from './pages/TelaGraficos';
import TelaDispositivo from './pages/TelaDispositivo';
import TelaPerfil from './pages/TelaPerfil';
import TelaSobre from './pages/TelaSobre';
import TelaLogin from './pages/TelaLogin';
import TelaPerguntas from './pages/TelaPerguntas';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TelaPrincipal />} />
        <Route path='/login' element={<TelaLogin />} />
        <Route path='/cadastro' element={<TelaCadastro />} />
        <Route path='/principal' element={<TelaPrincipal />} />
        <Route path='/graficos' element={<TelaGraficos />} />
        <Route path='/dispositivo' element={<TelaDispositivo />} />
        <Route path='/perfil' element={<TelaPerfil />} />
        <Route path='/sobre' element={<TelaSobre />} />
        <Route path='/perguntas' element={<TelaPerguntas />} />
      </Routes>
    </Router>
  );
}
