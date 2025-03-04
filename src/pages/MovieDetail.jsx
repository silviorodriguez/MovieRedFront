import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieByIdService, deleteMovieService, updateMovieService } from '@/services/userServices';
import '../styles/movieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieByIdService(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Error al obtener la película');
      }
    };

    fetchMovie();
  }, [id]);
  
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await updateMovieService(id, movie, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Película actualizada!');
        navigate('/');
      } else {
        alert('Error al actualizar la película.');
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      setError('Error al actualizar la película');
    }
  };


  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Asegúrate de obtener el token correcto
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await deleteMovieService(id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert('Película eliminada!');
        navigate('/');
      } else {
        alert('Error al eliminar la película.');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError('Error al eliminar la película');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail" style={{ backgroundImage: `url(${movie.image})` }}>
      <div className="movie-detail-content">
        <h1>{movie.name}</h1>
        <p>{movie.year}</p>
        <p>{movie.runtime} minutes</p>
        <p>{Array.isArray(movie.categories) ? movie.categories.join(', ') : movie.categories}</p>
        <p>{movie.storyline}</p>
        <p>Director: {movie.director}</p>
        <p>Writer: {movie.writer}</p>
        <p>Actors: {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}</p>
        <button onClick={() => navigate('/')}>Home</button>
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MovieDetail;