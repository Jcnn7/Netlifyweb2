import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CustomizeCD from './pages/CustomizeCD'; // Asegúrate de que este archivo exista
import Header from './components/Header';
import Cards from './pages/Cards'; // Asegúrate de que este archivo exista
import Preview from './pages/Preview';
import SpotifyAPI from './components/SpotifyAPI';
import './styles/App.css';

function App() {
  // Estado global para almacenar las fotos
  const [fotos, setFotos] = useState([]);

  // Función para actualizar las fotos
  const handleUpdateFotos = (newFoto) => {
    setFotos((prevFotos) => [...prevFotos, newFoto]);
  };

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/cd" 
            element={<CustomizeCD onUpdateFotos={handleUpdateFotos} />} 
          />
          <Route 
            path="/preview" 
            element={<Preview fotos={fotos} />} 
          />
        </Routes>
      </div>
      <Cards />
    </Router>
  );
}

// Crear la raíz y renderizar la aplicación usando createRoot (React 18)
const root = ReactDOM.createRoot(document.getElementById('root')); // Asegúrate de que el ID del elemento sea 'root'
root.render(<App />);

export default App;
