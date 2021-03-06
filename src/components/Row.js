import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';
const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // dependent variable that is being pulled from outside useEffect
  // useEffect must re-render with new fetched url

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(''); // closes trailer
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v')); //gets the youtube ID after v=
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className='row'>
      {/* container with movie posters */}
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
