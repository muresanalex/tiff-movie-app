import React from "react";
import PropTypes from "prop-types";
import "./watchlist.css";

const Watchlist = ( {
    showWatchlist,
    watchlist,
    removeFromWatchlist,
    onClickMovie,
    getMovie,
    removeEmpty,
} ) => {
    const eachMovie = ( movie ) => {
        const baseUrl = "http://img.youtube.com/vi/";
        const thumbnail = "/hqdefault.jpg";
        const imageSource = movie.ytUrl === "" ?
                "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg" :
                `${ baseUrl + movie.ytUrl.substring( 30 ) + thumbnail }`;
        return (
            <li key={ movie.id }>
                <div className="watchlist-movie">
                    <div
                        className="movie-poster"
                        onClick={ () => {
                            getMovie( movie.id );
                            onClickMovie();
                        } }
                    >
                        <img src={ imageSource } alt={ movie.titleRo } />
                    </div>
                    <div
                        className="movie-details"
                        onClick={ () => {
                            getMovie( movie.id );
                            onClickMovie();
                        } }
                    >
                        <span className="movie-title">{ movie.titleRo }</span>
                        <span>{ movie.year }</span>
                    </div>
                    <div
                        className="trash"
                        onClick={ () => {
                            removeFromWatchlist( movie.id );
                        } }
                    >
                        <img src="http://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png" alt="trash" />
                    </div>
                </div>
            </li>
        );
    };
    return (
        <div className="watchlist-container">
            <button className="button-watchlist" onClick={ showWatchlist }>Watchlist</button>
            <div className={ `watchlist ${ removeEmpty }` }>
                <ul>
                    <li className="empty-watchlist"><span>Watchlist is empty!</span></li>
                    {

                        watchlist.map( eachMovie )
                    }
                </ul>
            </div>
        </div>
    );
};

Watchlist.propTypes = {
    showWatchlist: PropTypes.func.isRequired,
    removeFromWatchlist: PropTypes.func.isRequired,
    onClickMovie: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    removeEmpty: PropTypes.string.isRequired,
    watchlist: PropTypes.arrayOf( PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ) ).isRequired,
};

export default Watchlist;
