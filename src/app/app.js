import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MovieList from "../movie-list/movielist";
import TopBar from "../top-bar/topBar";
import Lightbox from "../lightbox/lightbox";
import {
    addMovie,
    toggleMovieTrailer,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
} from "../actions";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            changeView: "",
            removeEmpty: "",
            displayWatchlist: "",
            displayAsList: "",
            displayLightBox: "",
            message: "",
        };
        this.handleChangeView = this.handleChangeView.bind( this );
        this.showLightBox = this.showLightBox.bind( this );
        this.getMovie = this.getMovie.bind( this );
        this.addMovieToWatchlist = this.addMovieToWatchlist.bind( this );
        this.showWatchlist = this.showWatchlist.bind( this );
        this.removeFromWatchlist = this.removeFromWatchlist.bind( this );
        this.showMessage = this.showMessage.bind( this );
    }

    getMovie( movieId ) {
        const url = "http://localhost:3000/tiff2017";

        this.checkIfMovieIsInTheList( movieId );
        setTimeout( () => {
            this.props.dispatch( addMovie( url, movieId ) );
            this.setState( {
                displayLightBox: "display-light-box",
            } );
        }, 500 );
    }

    checkIfMovieIsInTheList( id ) {
        const { watchlist } = this.props;
        let isInWatchlist = false;

        watchlist.forEach( ( item ) => {
            isInWatchlist = item.id === id ? true : isInWatchlist;
        } );

        if ( isInWatchlist ) this.showMessage();
        else this.showButton();
    }

    handleChangeView() {
        const newChangeView = this.state.changeView === "" ? "change-name" : "";
        const newDisplayAsList = this.state.displayAsList === "" ? "display-as-list" : "";
        this.setState( {
            changeView: newChangeView,
            displayAsList: newDisplayAsList,
        } );
    }

    showLightBox() {
        const newDisplayLightBox = this.state.displayLightBox === "" ? "loading" : "";
        this.setState( {
            displayLightBox: newDisplayLightBox,
        } );
        this.props.dispatch( toggleMovieTrailer() );
    }

    addMovieToWatchlist( movie ) {
        this.setState( {
            removeEmpty: "remove-empty",
        } );
        this.props.dispatch( addMovieToWatchlist( movie ) );
    }

    showWatchlist() {
        const newDisplayWatchlist = this.state.displayWatchlist === "" ? "display-watchlist" : "";
        this.setState( {
            displayWatchlist: newDisplayWatchlist,
        } );
    }

    removeFromWatchlist( movieId ) {
        const { watchlist } = this.props;

        if ( watchlist.length === 1 ) {
            this.setState( {
                removeEmpty: "",
            } );
        }
        this.props.dispatch( removeMovieFromWatchlist( movieId ) );
    }

    showMessage() {
        this.setState( {
            message: "show-message",
        } );
    }

    showButton() {
        this.setState( {
            message: "",
        } );
    }

    render() {
        return (
            <div
                ref={ ( node ) => {
                    this.node = node;
                } }
            >
                <TopBar
                    handleChangeView={ this.handleChangeView }
                    showWatchlist={ this.showWatchlist }
                    watchlist={ this.props.watchlist }
                    removeFromWatchlist={ this.removeFromWatchlist }
                    onClickMovie={ this.showLightBox }
                    getMovie={ this.getMovie }
                    changeView={ this.state.changeView }
                    removeEmpty={ this.state.removeEmpty }
                    displayWatchlist={ this.state.displayWatchlist }
                />
                <MovieList
                    displayAsList={ this.state.displayAsList }
                    onClickMovie={ this.showLightBox }
                    getMovie={ this.getMovie }
                    list={ this.props.list }
                    dispatch={ this.props.dispatch }
                />
                <Lightbox
                    display={ this.state.displayLightBox }
                    onClickLightBox={ this.showLightBox }
                    movie={ this.props.movie }
                    addMovieToWatchlist={ this.addMovieToWatchlist }
                    playMovieTrailer={ this.props.playMovieTrailer }
                    showMessage={ this.showMessage }
                    message={ this.state.message }
                />
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        playMovieTrailer: state.playMovieTrailer,
        movie: state.movie,
        watchlist: state.watchlist,
        list: state.list,
    };
}

App.propTypes = {
    playMovieTrailer: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    movie: PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ).isRequired,
    watchlist: PropTypes.arrayOf( PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ) ).isRequired,
    list: PropTypes.arrayOf( PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ) ).isRequired,
};

export default connect( mapStateToProps )( App );
