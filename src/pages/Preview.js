import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import '../styles/Preview.css';
import 'aos/dist/aos.css';
import logo from '../logos/urcdletters.png';

const Preview = () => {
  const location = useLocation();
  const { fotos: initialFotos = [], canciones: initialCanciones = [] } = location.state || { fotos: [], canciones: [] };

  const [title, setTitle] = useState('');
  const [dedication, setDedication] = useState('');
  const [author, setAuthor] = useState('');
  const [savedImages, setSavedImages] = useState(initialFotos);
  const [savedSongs, setSavedSongs] = useState(initialCanciones);
  const [fotos, setFotos] = useState(initialFotos);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });

    const savedTitle = localStorage.getItem('cdTitle');
    const savedDedication = localStorage.getItem('cdDedication');
    const savedAuthor = localStorage.getItem('cdAuthor');

    if (savedTitle) setTitle(savedTitle);
    if (savedDedication) setDedication(savedDedication);
    if (savedAuthor) setAuthor(savedAuthor);

    setSavedSongs(initialCanciones);
    setSavedImages(initialFotos);
  }, [initialFotos, initialCanciones]);

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
    if (fotos) {
      localStorage.setItem('cdImages', JSON.stringify(fotos));
    }

    if (initialCanciones) {
      localStorage.setItem('cdSongs', JSON.stringify(initialCanciones));
    }
  }, [fotos, initialCanciones]);

  const handleAddFoto = (event) => {
    const newFoto = event.target.files[0];
    if (newFoto && newFoto instanceof File && fotos.length < 3) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;

        const updatedFotos = [...fotos, base64String];
        setFotos(updatedFotos);
        setSavedImages(updatedFotos);
        localStorage.setItem('cdImages', JSON.stringify(updatedFotos));
      };
      reader.readAsDataURL(newFoto);
    } else if (fotos.length >= 3) {
      alert("Solo puedes subir hasta 3 fotos.");
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleRemoveFoto = (index) => {
    const updatedFotos = fotos.filter((_, i) => i !== index);
    setFotos(updatedFotos);
    setSavedImages(updatedFotos);
    localStorage.setItem('cdImages', JSON.stringify(updatedFotos));
  };

  return (
    <div className="cd-preview-container" data-aos="fade-up">
      <h2 className="cd-preview-title-large">Vista Previa de tu CD</h2>

      <div className="cd-preview-form">
        <label>
          Título del Disco:
          <input 
            type="text" 
            value={title} 
            onChange={handleTitleChange} 
            className="input-field"
          />
        </label>
        <label>
          Dedicatoria:
          <textarea 
            value={dedication} 
            onChange={handleDedicationChange} 
            className="textarea-field"
          />
        </label>
        <label>
          Autor:
          <input 
            type="text" 
            value={author} 
            onChange={handleAuthorChange} 
            className="input-field"
          />
        </label>
      </div>

      <div className="cd-preview-content">
        <h3>Vista Previa de Imágenes</h3>
        <div className="cd-preview-images" data-aos="fade-right">
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

          <div className="cd-preview-section" data-aos="fade-left">
            <h4>Imagen Interna</h4>
            {savedImages.length > 1 && (
              <img 
                className="cd-preview-inner" 
                src={savedImages[1]} 
                alt="Imagen Interna" 
              />
            )}
            <p className="cd-preview-dedication">{dedication || "Dedicatoria"}</p>
          </div>

          <div className="cd-preview-section" data-aos="fade-right">
            <h4>Contratapa</h4>
            <div className="cd-preview-back-container">
              {savedImages.length > 2 && (
                <img 
                  className="cd-preview-back" 
                  src={savedImages[2]} 
                  alt="Contratapa" 
                />
              )}
              <img 
                className="cd-preview-logo" 
                src={logo}
                alt="Logo de la empresa"
              />
            </div>
            <h4>Lista de Canciones</h4>
            <ul className="cd-preview-songs-list">
              {savedSongs.map((cancion, index) => (
                <li key={index}>{cancion.name} - {cancion.artists.join(', ')}</li>
              ))}
            </ul>
            <p className="cd-preview-dedication">{dedication || "Dedicatoria"}</p>
          </div>
        </div>
      </div>

      <h2 className='folders-section'>Fotos o imágenes</h2>
      <div className='folders-section'>
        {fotos.map((foto, index) => (
          <div key={index} className="foto-item">
            <img 
              src={foto} 
              alt={`Foto ${index + 1}`} 
              className="album-cover"
            />
            <button onClick={() => handleRemoveFoto(index)} className="remove-button">Eliminar</button>
          </div>
        ))}
        {fotos.length < 3 && (
          <label className="foto-upload" htmlFor="fileInput">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleAddFoto}
              style={{ display: 'none' }}
            />
            <span>
              {fotos.length === 0 ? "Cargar Portada" : fotos.length === 1 ? "Cargar Foto Interior" : "Cargar Contratapa"}
            </span>
          </label>
        )}
      </div>

      <button className="back-button" onClick={() => window.history.back()}>Volver</button>
    </div>
  );
};

export default Preview;
