import React from 'react';
import { connect } from 'react-redux';
import {data as moviesList} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';


class App extends React.Component {

  componentDidMount(){
    //API call can be perform here
   
    //---- dispatch action
    this.props.dispatch(addMovies(moviesList));

    //console.log('After dispatch STATE:',store.getState());
  }

  //---- check is movie is fav or not
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      console.log("Found fav. movie");
      return true;
    }
    return false;
    
  }

  //--- change between tab movies and fav
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  }

  render() {
    const { movies , search} = this.props; //---- extract state which is comming from reducers {movies,search}
    const { list, favourites, showFavourites } = movies; //---- movies is an object which contian differnt items

    console.log("RENDER in app",this.props);

    //---- if showFavourites= true so displayMovie have fav list else it have all movies list
    const diaplayMovies = showFavourites ? favourites : list;

    
    return (
      <div className="App" >

        <Navbar search={search} />

        <div className="main" >
          <div className="tabs" >
              {/* on click on tabs it will set which tab to display */}
            <div className={`tab ${showFavourites ? '': 'active-tabs' }`} onClick={() => this.onChangeTab(false) } >Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs':'' }`} onClick={ () => this.onChangeTab(true) } >Favourites</div>
          </div>

          <div className="list">
              {/* map send every (element, index of element) in array  */}
              { diaplayMovies.map( (movie,index) =>(
                <MovieCard 
                  movie ={movie} 
                  key={`movies-${index}`} 
                  dispatch={this.props.dispatch} 
                  isFavourite= {this.isMovieFavourite(movie)}
                />
              ) ) }
          </div>
          {/* if no movie to diplay it will show MESSAGE elso msg is hide and movie display */}
          { diaplayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null } 
        </div>

      </div>
    );

  }
}

//---- wrapper is used because every time we have to pass state to inherit child so this is use to get excess of the store.
//---- we we don't have function (ie: ismoviemount etc) we can use it inside render above.
// class AppWrapper extends React.Component {
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state){
  return {
    movies: state.movies,
    search: state.search
  }
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
