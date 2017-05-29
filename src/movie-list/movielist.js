import React from "react";
import PropTypes from "prop-types";
import { fetchData } from "../actions";
import "./movielist.css";

class MovieList extends React.Component {
    constructor() {
        super();
        this.movieIndex = 1;
        this.key = 0;
        this.buildMovieItem = this.buildMovieItem.bind( this );
    }

    componentDidMount() {
        const root = document.getElementById( "root" );
        window.addEventListener( "scroll", () => {
            const isAtBottomOfThePage = window.innerHeight + window.pageYOffset + 600 >= root.offsetHeight;
            if ( isAtBottomOfThePage ) {
                this.addMovies( 10 );
            }
        } );
    }

    getNewMovie( url ) {
        this.props.dispatch( fetchData( url, this.movieIndex ) );
        this.movieIndex += 1;
    }

    addMovies( numberOfMovies ) {
        for ( let i = 0; i < numberOfMovies; i += 1 ) {
            this.addNewMovie();
        }
    }

    addNewMovie() {
        const url = "http://localhost:3000/tiff2017";
        if ( this.movieIndex < 99 ) {
            this.getNewMovie( url );
        } else {
            this.movieIndex = 1;
            this.getNewMovie( url );
        }
    }

    buildMovieItem( movie ) {
        const baseUrl = "http://img.youtube.com/vi/";
        const thumbnail = "/hqdefault.jpg";
        const imageSource = movie.ytUrl === "" ?
                "https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg" :
                `${ baseUrl + movie.ytUrl.substring( 30 ) + thumbnail }`;
        this.key += 1;
        return (
            <li key={ this.key } >
                <div
                    className="movie clearfix"
                    onClick={ () => {
                        this.props.onClickMovie();
                        this.props.getMovie( movie.id );
                    } }
                >
                    <img src={ imageSource } alt={ movie.titleRo } />
                    <span className="title">{ movie.titleRo }</span>
                    <span className="year">{ movie.year }</span>
                </div>
            </li> );
    }

    render() {
        return (
            <div className="scroll-component">
                <ul className={ this.props.displayAsList }>
                    { this.props.list.map( this.buildMovieItem ) }
                </ul>
            </div>
        );
    }
}

MovieList.propTypes = {
    displayAsList: PropTypes.string.isRequired,
    onClickMovie: PropTypes.func.isRequired,
    getMovie: PropTypes.func.isRequired,
    list: PropTypes.arrayOf( PropTypes.shape( {
        titleRo: PropTypes.string,
        year: PropTypes.string,
        country: PropTypes.string,
        ytUrl: PropTypes.string,
    } ) ).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default MovieList;
