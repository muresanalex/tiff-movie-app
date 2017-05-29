import React from "react";
import PropTypes from "prop-types";
import Watchlist from "../watchlist/watchlist";
import "./topBar.css";

const TopBar = ( {
    handleChangeView,
    showWatchlist,
    watchlist,
    removeFromWatchlist,
    onClickMovie,
    getMovie,
    changeView,
    removeEmpty,
    displayWatchlist,
} ) => (
    <div className={ `navbar ${ changeView } ${ displayWatchlist }` }>
        <button className="button-list" onClick={ handleChangeView }>
            <span className="list">List</span>
            <span className="grid">Grid</span>
        </button>
        <Watchlist
            showWatchlist={ showWatchlist }
            watchlist={ watchlist }
            removeFromWatchlist={ removeFromWatchlist }
            onClickMovie={ onClickMovie }
            getMovie={ getMovie }
            removeEmpty={ removeEmpty }
        />
    </div>
);

TopBar.propTypes = {
    handleChangeView: PropTypes.func.isRequired,
    showWatchlist: PropTypes.func.isRequired,
    removeFromWatchlist: PropTypes.func.isRequired,
    onClickMovie: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    changeView: PropTypes.string.isRequired,
    removeEmpty: PropTypes.string.isRequired,
    displayWatchlist: PropTypes.string.isRequired,
    watchlist: PropTypes.arrayOf( PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ) ).isRequired,
};

export default TopBar;
