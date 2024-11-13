// SpotifyAPI.js
import axios from 'axios';
import '../styles/SpotifyAPI.css'

const clientId = '5f7945bf0829422c8fedeb198f0e6901';
const clientSecret = 'f942d2675a574c80a07eb7c51cd119b2'; // Inserta tu client secret aquí
const authUrl = 'https://accounts.spotify.com/api/token';
let accessToken = '';

const getAccessToken = async () => {
  if (!accessToken) {
    try {
      const response = await axios.post(authUrl, new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      accessToken = response.data.access_token;
    } catch (error) {
      console.error('Error obteniendo el token de acceso:', error.response ? error.response.data : error.message);
      throw new Error('Error al obtener el token de acceso');
    }
  }

  return accessToken;
};

const searchTracks = async (query) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 10, // Puedes cambiar el límite de resultados si lo deseas
      },
    });

    // Mapea la respuesta para obtener solo los datos relevantes
    return response.data.tracks.items.map(track => ({
      name: track.name,
      artists: track.artists.map(artist => artist.name), // Artistas de la canción
      album: track.album.name, // Nombre del álbum
      albumCover: track.album.images[0]?.url, // Imagen del álbum (si existe)
    }));
  } catch (error) {
    console.error('Error al buscar canciones:', error.response ? error.response.data : error.message);
    throw new Error('No se pudo realizar la búsqueda de canciones');
  }
};

export { searchTracks };
