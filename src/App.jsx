import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'

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

  const fetchMovies = async () => {
    try {

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error Fetching Movies, please try again later :) ")
    }
  }

  useEffect(() => {
   
  }, [])
  
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
          {errorMessage && <p className='text-red-700'>{errorMessage}</p>}
        </section>
        

        <h1 className='text-white'>{searchTerm}</h1>
      </div>

    </main>
    
  )
}

export default App