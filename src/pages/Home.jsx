import { useEffect, useState } from 'react';
import { getMoviesService } from '@/services/userServices';
import SearchBar from '../components/SearchBar';
import '../styles/home.css';
import '../components/searchBar/searchBar.css';


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesService();
        console.log(response.data); // Verificar los datos recibidos
        if (response.data && Array.isArray(response.data.movie)) {
          setMovies(response.data.movie);
          setFilteredMovies(response.data.movie); // Inicialmente mostrar todas las películas
          setCarouselMovies(response.data.movie.slice(0, 3)); // Limitar a las primeras 3 películas para el carrusel
        } else {
          setError('Los datos recibidos no son un array');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error al obtener las películas');
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      
      {/* Carrusel */}
      <div id="myCarousel" className="carousel slide mb-2" data-bs-ride="carousel">
        {/* Indicadores del carrusel */}
        <div className="carousel-indicators">
          {carouselMovies.map((movie, index) => (
            <button
              key={movie._id} // Usar el _id de la película como clave
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        {/* Contenido del carrusel */}
        <div className="carousel-inner">
          {carouselMovies.map((movie, index) => (
            <div key={movie._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={movie.image} // Usar la propiedad `image` de la película
                className="d-block custom-image-size" // Aplica la clase CSS aquí
                alt={movie.name} // Usar la propiedad `name` de la película
              />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>{movie.name}</h1>
                  <p className="opacity-75">{movie.year}</p>
                  <p><a className="btn btn-secondary" href={`/movies/${movie._id}`}>See details »</a></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Controles del carrusel */}
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
       {/* Sección de marketing */}
       <SearchBar handleSearch={handleSearch} />
      <div className="container marketing">
        {/* Mostrar todas las películas en columnas */}
        <div className="row">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="col-lg-4">
              <img
                src={movie.image} // Usar la propiedad `image` de la película
                className="bd-placeholder-img" // Aplica la clase CSS aquí
                width="320"
                height="200"
                alt={movie.name} // Usar la propiedad `name` de la película
              />
              <h2 className="fw-normal">{movie.name}</h2>
              <p className='storyline'>{movie.storyline}</p> 
              <p><a className="btn btn-secondary" href={`/movies/${movie._id}`}>See details »</a></p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="container">
        <p className="float-end"><a href="#">Back to Top</a></p>
        <p>© 2017–2024 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    </div>
  );
};

export default Home;