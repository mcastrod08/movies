import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { Client } from 'appwrite';

import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite.js';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {



  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSerchTerm, setDebouncedSerchTerm] = useState('');

  //Se usa para que la busqueda tarde 500ms, para que no haya tantas llamadas a la API
  useDebounce(() => setDebouncedSerchTerm(searchTerm), 500, [searchTerm])

  
  const fetchMovies = async (query ='') => {

    //Loading
    setIsLoading(true);

    setErrorMessage('');
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        
        return;
      }
     
      setMovieList(data.results || []);
      
      //console.log(data.results)

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error Fetching Movies, please try again later :) ")
    } finally {
      setIsLoading(false);
    }
  }

  //se rendea al inicio
  useEffect(() => {
   fetchMovies(debouncedSerchTerm);
  }, [debouncedSerchTerm]); //se llamará para cada busqueda
  
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>

          <img src="./hero.png" alt='Hero banner'/>
          <h1>Movies <span className="text-gradient">Web</span> Title</h1>
          <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className="text-center mt-[40px]">All Movies</h2>
          {errorMessage && <p className='text-red-700'>{errorMessage}</p>}
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-700'>{errorMessage}</p>
          ) : (

            <ul>
            
              {movieList.map((movie) => (
                //<p key={movie.id} className='text-white'>{movie.title}</p>
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
        
      </div>

    </main>
    
  )
}

export default App