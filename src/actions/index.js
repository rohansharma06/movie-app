
//---- action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_To_FAVOURITES = 'ADD_To_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULTS = 'ADD_SEARCH_RESULTS';

//---- action creaters
export function addMovies (movies){
    return {
        type: ADD_MOVIES,
        movies: movies
    }
}

export function addFavourite (movie){
    return {
        type: ADD_To_FAVOURITES,
        movie: movie
    }
}

export function removeFromFavourite (movie){
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie: movie
    }
}

export function setShowFavourite (val){
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList(movie){
    return {
        type : ADD_MOVIE_TO_LIST,
        movie
    };
}

export function handleMovieSearch(movie) {

    const url = `http://www.omdbapi.com/?apikey=e8f39a54&t=${movie}`;

    return function (dispatch) {
        fetch(url)
            .then(response => response.json())
            .then(movie => {
                console.log('movie',movie);

                dispatch(addMovieSearchResult(movie));
            })
    }
}

export function addMovieSearchResult(movie){
    return {
        type: ADD_SEARCH_RESULTS,
        movie
    }
}
