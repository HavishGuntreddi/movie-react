import {useState} from 'react';

function SearchMovie(){

    const[query, setQuery] = useState("");
    const[movies, setMovies] = useState([]);


    async function movieSearch(){
        
        if(!query){
            document.getElementById("mov").placeholder = "Please enter a movie or TV show";
             return;
        } else {
            document.getElementById("mov").placeholder = "Enter a movie or TV show";
        }

        const response = await fetch(
            `http://www.omdbapi.com/?apikey=d9897356&s=${query}`
        );

        const data = await response.json();
        setMovies(data.Search || []);
        console.log(data);
    }



    const keyDown = (event) => {
        if(event.key === "Enter"){
            document.getElementById("submit").click();
        }
    }

    return(
        <div>
            <label htmlFor="Search" id = "searchBack">Movie/TV Show Name</label><br />
            <input type="text"
             name="movie" 
             id='mov'
             onKeyDown={keyDown} // detects ent
             value = {query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder='Enter movie or TV show...'
             /> 

            <button onClick = {movieSearch} className='button' id = "submit" type='submit'>Find Movie</button>
            
            <ul className='result-grid'>
                {movies.map((movie) => (
                    <li key = {movie.imdbID} className='result'>
                        <img src={movie.Poster}  alt={movie.Title} width="100" />
                        <br /> <p className='title'>{movie.Title} ({movie.Year})</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchMovie;