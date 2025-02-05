import React, { useState } from 'react'
import Search from './components/Search.jsx'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>

          <img src="./hero.png" alt='Hero banner'/>
          <h1>Movies <span className="text-gradient">Web</span> Title</h1>
        </header>

        <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm}/>

        <h1 className='text-white'>{searchTerm}</h1>
      </div>

    </main>
    
  )
}

export default App