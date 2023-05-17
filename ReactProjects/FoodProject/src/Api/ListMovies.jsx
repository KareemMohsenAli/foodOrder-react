import React, { useState } from "react";
import Movie from "./Movie";
import AddMovie from "./AddMovie";

export default function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

   async function MovieDataInput(movie){
     const response=await fetch('https://react-http-61eb7-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',

    }
    })
    const data=response.json()
    console.log(data)
 
  }

  async function fetchMoviesHandler() {
    setisLoading(true);
    try {
      const response = await fetch("https://react-http-61eb7-default-rtdb.firebaseio.com/movies.json");
      if(response.status!=200 ) {
        throw new Error('something went wrong')
      }
      const data = await response.json();
      const loadedMovies=[]
      for(const key in data) {
        loadedMovies.push({
          id: key,
          title:data[key].title,
          text:data[key].text,
          release:data[key].release

        })
      }
      setMovies(loadedMovies);
      setisLoading(false);
    } catch (error) {
        setError(error.message);
        setisLoading(false);
    }
  }

  //   function fetchMoviesHandler() {
  //     setError(null)
  //     setisLoading(true);
  //     fetch("https://swapi.dev/api/film/")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setError(null)
  //         setMovies(data.results);
  //         setisLoading(false);
  //       })
  //       .catch((error) => {
  //         setError(error.message)
  //       })
  //   }

  return (
    <>
     <AddMovie onSaveData={MovieDataInput}/>
     <div className="container text-center mt-5">
     { !isLoading  && error && <p>{error}</p>}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-danger " onClick={fetchMoviesHandler}>
          fetch data
        </button>
      </div>
      {isLoading && (
        <div class="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}

      <div className="row">
        {!isLoading &&
          movies.map((movie) => {
            return (
              <div className="col-lg-3 mt-2 ">
                <Movie
                  opening_crawl={movie.opening_crawl}
                  release_date={movie.release_date}
                  title={movie.title}
                />
              </div>
            );
          })}

        {!isLoading && movies.length === 0 &&!error && <p> Not Found !!.</p>}
      </div>
    </div></>
   
  );
}
