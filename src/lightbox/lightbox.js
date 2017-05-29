import React from "react";
import PropTypes from "prop-types";
import "./lightbox.css";

const Lightbox = ( {
    movie,
    display,
    onClickLightBox,
    playMovieTrailer,
    showMessage,
    addMovieToWatchlist,
    message,
} ) => {
    const baseUrl = "http://img.youtube.com/vi/";
    const thumbnail = "/hqdefault.jpg";
    const imageSource = movie.ytUrl === "" || movie.ytUrl === undefined ?
            "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg" :
            `${ baseUrl + movie.ytUrl.substring( 30 ) + thumbnail }`;
    return (
        <div className={ `light-box ${ display }` }>
            <div className="opacity" onClick={ onClickLightBox } />
            <div className={ `content ${ message } clearfix` }>
                <div className="close-lightbox" onClick={ onClickLightBox } >&times;</div>
                <div className="clearfix">
                    <img src={ imageSource } alt={ movie.titleRo } />
                    <div className="details">
                        <dl>
                            <dt className="lightbox-title">{ movie.titleRo }</dt>
                            <dt className="lightbox-year">{ movie.year }</dt>
                            <dt className="lightbox-country">Country:</dt>
                            <dd className="lightbox-country-content">{ movie.country }</dd>
                        </dl>
                    </div>
                </div>
                <div className="lightbox-trailer">
                    {
                        toggleMovieTrailer( playMovieTrailer, movie )
                    }
                </div>
                <button
                    className="button-add-to-watchlist"
                    onClick={ () => {
                        addMovieToWatchlist( movie );
                        showMessage();
                    } }
                >Add to watchlist</button>
                <div className="added-to-watchlist">Added to watchlist</div>
            </div>
            <div className="content-loading">
                <div className="loader" />
            </div>
        </div>
    );
};

function toggleMovieTrailer ( flag, movie ) {
    if ( flag && movie.ytUrl !== "" ) {
        return <iframe width="500" height="375" src={ movie.ytUrl } allowFullScreen />;
    }
    return <span>Trailer not available</span>;
}

Lightbox.propTypes = {
    display: PropTypes.string.isRequired,
    onClickLightBox: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    addMovieToWatchlist: PropTypes.func.isRequired,
    playMovieTrailer: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    movie: PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
    } ).isRequired,
};

export default Lightbox;
