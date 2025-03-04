import axios from 'axios';

const BASE_URL = 'https://moviered.vercel.app';

const registerUserService = (data) => axios.post(`${BASE_URL}/users`, data);

const loginUserService = (data) => axios.post(`${BASE_URL}/users/login`, data);

const getMoviesService = () => axios.get(`${BASE_URL}/movies`);

const getMovieByIdService = (id) => axios.get(`${BASE_URL}/movies/${id}`);

const updateMovieService = (id, data, config) => axios.put(`${BASE_URL}/movies/${id}`, data, config);

const deleteMovieService = (id, config) => axios.delete(`${BASE_URL}/movies/${id}`, config);

export const createMovieService = (movieData, config) => {
  return axios.post(`${BASE_URL}/movies`, movieData, config);
};

export { 
  registerUserService, 
  loginUserService, 
  getMoviesService, 
  getMovieByIdService, 
  deleteMovieService, 
  updateMovieService 
};