import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos'; // Import AOS
import { searchTracks } from '../components/SpotifyAPI'; // Import your SpotifyAPI
import '../styles/CustomizeCD.css';

const CustomizeCD = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [canciones, setCanciones] = useState([]);
  const [fotos, setFotos] = useState([]); // Estado para las imágenes
  const [packaging, setPackaging] = useState("Estándar");
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });

    // Cargar datos desde local storage si están disponibles
    const savedSongs = JSON.parse(localStorage.getItem('cdSongs')) || [];
    const savedImages = JSON.parse(localStorage.getItem('cdImages')) || [];
    setCanciones(savedSongs);
    setFotos(savedImages);
  }, []);

  const handleAddCancion = (cancion) => {
    const updatedSongs = [...canciones, cancion];
    setCanciones(updatedSongs);
    localStorage.setItem('cdSongs', JSON.stringify(updatedSongs)); // Guardar en local storage
  };

  const handleRemoveCancion = (index) => {
    const updatedSongs = canciones.filter((_, i) => i !== index);
    setCanciones(updatedSongs);
    localStorage.setItem('cdSongs', JSON.stringify(updatedSongs)); // Guardar en local storage
  };

  const handleUpdateBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const handleBuscarCanciones = async (event) => {
    event.preventDefault(); // Evita la acción predeterminada del formulario
    if (busqueda.trim() !== '') {
      const resultadosBusqueda = await searchTracks(busqueda);
      setResultados(resultadosBusqueda);
    }
  };

  const handleAddFoto = (event) => {
    const newFoto = event.target.files[0];
    if (newFoto && newFoto instanceof File && fotos.length < 3) {
      const updatedFotos = [...fotos, newFoto];
      setFotos(updatedFotos);
      localStorage.setItem('cdImages', JSON.stringify(updatedFotos)); // Guardar en local storage
    } else if (fotos.length >= 3) {
      alert("Solo puedes subir hasta 3 fotos.");
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleRemoveFoto = (index) => {
    const updatedFotos = fotos.filter((_, i) => i !== index);
    setFotos(updatedFotos);
    localStorage.setItem('cdImages', JSON.stringify(updatedFotos)); // Guardar en local storage
  };

  // Función para manejar la vista previa
  const handlePreview = () => {
    navigate('/preview', {
      state: {
        fotos: fotos,
        canciones: canciones,
      },
    });
  };

  const scrollToSearchSection = () => {
    const section = document.querySelector('.search-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }}

    const scrollToSearchResults = () => {
      const section = document.querySelector('.search-results');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }}

      const scrollToAddedSongs = () => {
        const section = document.querySelector('.folders-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }}

  return (
    <div className="customize-cd" data-aos="fade-up">
      <h1 className='search-section' data-aos="fade-up" data-aos-delay="1000">Pasos A Seguir</h1>
      <div className="step-container">
        <div className="step">
          <span className="step-number">1</span>
          <span>Elegi tus canciones</span>
          <button onClick={scrollToSearchSection}>Buscar Canciones</button>
        </div>
        <div className="arrow">›</div> {/* Flecha entre pasos */}
        <div className="step">
          <span className="step-number">2</span>
          <span>Diseña a tu gusto el disco</span>
          <button onClick={scrollToSearchResults} >Canciones Agregadas</button>
        </div>
        <div className="arrow">›</div> {/* Flecha entre pasos */}
        <div className="step">
          <span className="step-number">3</span>
          <span>Elegi la Tapa, foto interna y la contratapa</span>
          <button onClick={scrollToAddedSongs}>Subir Fotos</button>
        </div>
        <div className="arrow">›</div> {/* Flecha entre pasos */}
        <div className="step">
          <span className="step-number">4</span>
          <span>Ten una preview de tu disco!</span>
          <button onClick={handlePreview}>Escuchar</button>
        </div>
      </div>

      {/* Sección de Búsqueda de Canciones */}
      <h2 className='search-section'>Buscar Canciones</h2>
      <form className='search-section' onSubmit={handleBuscarCanciones}>
        <input
          type="text"
          value={busqueda}
          onChange={handleUpdateBusqueda}
          placeholder="Buscar canciones en Spotify..."
        />
        <button className='search-section' type="submit">Buscar</button>
      </form>

      {/* Mostrar Resultados de Búsqueda */}
      <ul className='search-results'>
        {resultados.map((track) => (
          <li key={track.name}>
            <div className="search-result-items">
              {/* Imagen de portada del álbum */}
              {track.albumCover && (
                <img 
                  src={track.albumCover} 
                  alt={`Portada de ${track.album}`} 
                  className="album-cover"
                />
              )}
              <div className="track-info">
                <span>{track.name} - {track.artists.join(', ')}</span>
                <button className='search-section' onClick={() => handleAddCancion(track)}>Agregar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Sección de Canciones Agregadas */}
      <h2 className='added-songs-section'>Canciones Agregadas</h2>
      <ul className='added-songs-section'>
        {canciones.map((cancion, index) => (
          <li className='added-songs-section' key={index}>
            <span className='added-songs-section'>{cancion.name} - {cancion.artists.join(', ')}</span>
            <button className='added-songs-section' onClick={() => handleRemoveCancion(index)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Sección de Fotos */}
      <h2 className='folders-section'>Fotos o imágenes</h2>
      <div className='folders-section'>
        {fotos.map((foto, index) => (
          <div key={index} className="foto-item">
            {foto instanceof File && (
              <img src={URL.createObjectURL(foto)} alt={`Foto ${index + 1}`} />
            )}
            <button onClick={() => handleRemoveFoto(index)}>Eliminar</button>
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

      {/* Botón de Vista Previa */}
      <button className='preview-button' onClick={handlePreview}>Vista Previa del CD</button>
    </div>
  );
};

export default CustomizeCD;
