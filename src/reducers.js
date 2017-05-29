import { combineReducers } from "redux";

function movie( state = {}, action ) {
    switch ( action.type ) {
        case "ADD_MOVIE":
            return action.movie;
        default:
            return state;
    }
}

function playMovieTrailer( state = false, action ) {
    switch ( action.type ) {
        case "TOGGLE_MOVIEPLAYER":
            return !state;
        default:
            return state;
    }
}

function watchlist( state = [], action ) {
    let watchlistIndex = 0;
    switch ( action.type ) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return [ ...state, action.movie ];
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            state.forEach( ( item, index ) => {
                if ( item.movieId === action.movieId ) {
                    watchlistIndex = index;
                }
            } );
            return [
                ...state.slice( 0, watchlistIndex ),
                ...state.slice( watchlistIndex + 1 ),
            ];
        default:
            return state;
    }
}

function list ( state = [], action ) {
    switch ( action.type ) {
        case "GET_NEW_MOVIE":
            return [ ...state, action.movie ];
        default:
            return state;
    }
}

export default combineReducers( {
    list,
    movie,
    playMovieTrailer,
    watchlist,
} );
