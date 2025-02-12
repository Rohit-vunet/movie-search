import React, { useState} from 'react';
import "./Movie.css";

interface MovieSearch {
    Response: string;
    Poster: string;
    Title: string;
    Year: string;
    imdbRating: string;
    Plot: string;
}
const Movie = () => {
    const[loading,setloading] = useState(false)
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [data, setUserData] = useState<MovieSearch | null>(null);

    const fetchUser = async (user: string) => {
        setError("");
        setUserData(null);
        try {
            setloading(true);
            const response = await fetch(`http://www.omdbapi.com/?t=${user}&apikey=e36bf94a`);
            if (!response.ok) {
                setError("Movie not found");
                return;
            }

            const data: MovieSearch = await response.json();
            if (data.Response === "False") {
                setError("Movie not found");
                return;
            }
            setUserData(data);
        } catch{
            setError("Movie Name not found")
            setloading(true);
        }
    };


    return (
        <div className='MovieSearch'>
            <h1 className='MovieTitle'>Movie Search</h1>
            <div className='SearchContainer'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter movie title'
                    className='input'
                />
                <button onClick={() => fetchUser(title)} className="button">
                    Search
                </button>
            </div>

            {error && <p className="error">{error}</p>}
            {data && (
                <div className='Poster'>
                    <img src={data.Poster} alt={data.Title} />
                    <h2>{data.Year}</h2>
                    <h2>{data.Title}</h2>
                    <p>IMDb Rating: {data.imdbRating}</p>
                    <p>{data.Plot}</p>

                </div>
            )}

        </div>
    );
};

export default Movie;
