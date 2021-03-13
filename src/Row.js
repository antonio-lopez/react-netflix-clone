import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //   console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // dependent variable that is being pulled from outside useEffect
  // useEffect must re-render with new fetched url
  //   console.table(movies);

  return (
    <div className='row'>
      {/* container with movie posters */}
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className='row__poster'
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
