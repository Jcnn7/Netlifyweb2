import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import AOS from 'aos'; // Import AOS
import '../styles/Preview.css'; // Asegúrate de que esta línea está presente
import 'aos/dist/aos.css'; // Import AOS CSS
import logo from '../logos/urcdletters.png'; // Importa tu logo

const Preview = () => {
  const location = useLocation(); // Obtén la ubicación actual
  const { fotos, canciones } = location.state || { fotos: [], canciones: [] }; // Desestructura las fotos y canciones

  const [title, setTitle] = useState('');
  const [dedication, setDedication] = useState('');
  const [author, setAuthor] = useState('');
  const [savedImages, setSavedImages] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });

    // Cargar datos desde local storage si están disponibles
    const savedTitle = localStorage.getItem('cdTitle');
    const savedDedication = localStorage.getItem('cdDedication');
    const savedAuthor = localStorage.getItem('cdAuthor');
    const savedSongs = JSON.parse(localStorage.getItem('cdSongs')) || [];
    const savedImages = JSON.parse(localStorage.getItem('cdImages')) || [];

    if (savedTitle) setTitle(savedTitle);
    if (savedDedication) setDedication(savedDedication);
    if (savedAuthor) setAuthor(savedAuthor);
    setSavedSongs(savedSongs);
    setSavedImages(savedImages);
  }, []);

  // Maneja el cambio en los inputs y guarda en local storage
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    localStorage.setItem('cdTitle', e.target.value);
  };

  const handleDedicationChange = (e) => {
    setDedication(e.target.value);
    localStorage.setItem('cdDedication', e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    localStorage.setItem('cdAuthor', e.target.value);
  };

  useEffect(() => {
    // Guardar imágenes y canciones en local storage
    if (fotos) {
      const imageUrls = fotos.map((foto) => URL.createObjectURL(foto));
      localStorage.setItem('cdImages', JSON.stringify(imageUrls));
    }

    if (canciones) {
      localStorage.setItem('cdSongs', JSON.stringify(canciones));
    }
  }, [fotos, canciones]);

  return (
    <div className="cd-preview-container">
      <h2>Vista Previa de tu CD</h2>

      {/* Formulario de datos del CD */}
      <div className="cd-preview-form">
        <label>
          Título del Disco:
          <input 
            type="text" 
            value={title} 
            onChange={handleTitleChange} // Usar la función manejadora
          />
        </label>
        <label>
          Dedicatoria:
          <textarea 
            value={dedication} 
            onChange={handleDedicationChange} // Usar la función manejadora
          />
        </label>
        <label>
          Autor:
          <input 
            type="text" 
            value={author} 
            onChange={handleAuthorChange} // Usar la función manejadora
          />
        </label>
      </div>

      {/* Vista previa del CD */}
      <div className="cd-preview-content">
        <h3>Vista Previa de Imágenes</h3>
        <div className="cd-preview-images">
          {/* Tapa */}
          <div className="cd-preview-section">
            <h4>Portada</h4>
            <div className="cd-preview-cover-container">
              {savedImages.length > 0 && (
                <div 
                  className="cd-preview-cover"
                  style={{
                    backgroundImage: `url(${savedImages[0]})`
                  }}
                />
              )}
              <h4 className="cd-preview-title">{title || "Título del Disco"}</h4>
              <p className="cd-preview-author">{author || "Autor"}</p>
            </div>
          </div>

          {/* Imagen interna */}
          <div className="cd-preview-section">
            <h4>Imagen Interna</h4>
            {savedImages.length > 1 && (
              <img 
                className="cd-preview-inner" // Mantiene la clase del CSS
                src={savedImages[1]} 
                alt="Imagen Interna" 
              />
            )}
            <p className="cd-preview-dedication">{dedication || "Dedicatoria"}</p> {/* Texto indicando la dedicatoria */}
          </div>

          {/* Contratapa */}
          <div className="cd-preview-section">
            <h4>Contratapa</h4>
            <div className="cd-preview-back-container">
              {savedImages.length > 2 && (
                <img 
                  className="cd-preview-back" // Mantiene la clase del CSS
                  src={savedImages[2]} 
                  alt="Contratapa" 
                />
              )}
              {/* Logo sobre la imagen */}
              <img 
                className="cd-preview-logo" 
                src={logo} // Usa el logo importado
                alt="Logo de la empresa"
              />
            </div>
            <h4>Lista de Canciones</h4>
            <ul className="cd-preview-songs-list"> {/* Mantiene la clase del CSS */}
              {savedSongs.map((cancion, index) => (
                <li key={index}>{cancion.name} - {cancion.artists.join(', ')}</li>
              ))}
            </ul>
            <p className="cd-preview-dedication">{dedication || "Dedicatoria"}</p>
          </div>
        </div>
      </div>

      {/* Botón para regresar a CustomizeCD */}
      <button className="back-button" onClick={() => window.history.back()}>Volver</button>
    </div>
  );
};

export default Preview;
