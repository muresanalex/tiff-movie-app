import axios from "axios";

export function addMovie( url, id ) {
    return function thunk( dispatch ) {
        axios.get( url ).then( ( response ) => dispatch( {
            type: "ADD_MOVIE",
            movie: response.data[ id - 1 ],
        } ) );
    };
}

export function toggleMovieTrailer() {
    return {
        type: "TOGGLE_MOVIEPLAYER",
    };
}

export function addMovieToWatchlist( movie ) {
    return {
        type: "ADD_MOVIE_TO_WATCHLIST",
        movie,
    };
}

export function removeMovieFromWatchlist( movieId ) {
    return {
        type: "REMOVE_MOVIE_FROM_WATCHLIST",
        movieId,
    };
}

export function fetchData( url, index ) {
    return function thunk( dispatch ) {
        // dispatch( "FETCH_MOVIE" )
        axios.get( url ).then( ( response ) => dispatch( {
            type: "GET_NEW_MOVIE",
            movie: response.data[ index - 1 ],
        } ) );
    };
}
