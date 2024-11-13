import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Asegúrate de que esta ruta es correcta
import CustomizeCD from './pages/CustomizeCD';  // Asegúrate de que esta ruta es correcta
import Header from './components/Header';  // Asegúrate de que este archivo existe en components

function App() {
  return (
    <Router>
      <Header /> {/* El encabezado aparecerá en todas las rutas */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Ruta principal para Home */}
          <Route path="/cd" element={<CustomizeCD />} />  {/* Ruta para personalizar CD */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
