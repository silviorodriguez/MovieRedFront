import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/movieForm.css';

const MovieForm = ({ onSubmit }) => {
  const [movie, setMovie] = useState({
    name: '',
    year: '',
    runtime: '',
    categories: '',
    director: '',
    writer: '',
    actors: '',
    storyline: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await fetch('https://moviered.vercel.app/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movie)
      });

      if (response.ok) {
        alert("Datos guardados!");
        onSubmit(movie);
        setMovie({
          name: '',
          year: '',
          runtime: '',
          categories: '',
          director: '',
          writer: '',
          actors: '',
          storyline: '',
          image: ''
        });
      } else {
        alert("Error al guardar los datos.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar los datos.");
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Registrar Película</h1>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" value={movie.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="year">Año</label>
        <input type="number" id="year" name="year" value={movie.year} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="runtime">Duración (minutos)</label>
        <input type="number" id="runtime" name="runtime" value={movie.runtime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="categories">Categorías</label>
        <input type="text" id="categories" name="categories" value={movie.categories} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input type="text" id="director" name="director" value={movie.director} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="writer">Escritor</label>
        <input type="text" id="writer" name="writer" value={movie.writer} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="actors">Actores</label>
        <input type="text" id="actors" name="actors" value={movie.actors} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="storyline">Sinopsis</label>
        <textarea id="storyline" name="storyline" value={movie.storyline} onChange={handleChange} required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">URL de la Imagen</label>
        <input type="text" id="image" name="image" value={movie.image} onChange={handleChange} required />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

MovieForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default MovieForm;