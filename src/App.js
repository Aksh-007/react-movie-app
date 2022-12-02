import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import searchIcon from "./search.png"

const API_URl = "http://www.omdbapi.com?apikey=350b9a11";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URl}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('all')
  }, []);
  return (
    <div className='app'>
      <h1>MovieZilla</h1>
      <div className="search">
        <input
          placeholder='Search For Movie'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <img src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchItem)}
        />
      </div>

      {
        movies?.length > 0
          ?
          (<div className="container">
            {movies.map((movie) => (
              <Card movie={movie} />
            ))}
          </div>) : (
            <div className="empty">
              <h2>No movies Found</h2>
            </div>
          )


      }

    </div>
  );
}

export default App;
