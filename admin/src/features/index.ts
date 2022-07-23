import {combineReducers} from "@reduxjs/toolkit"

import {moviesListReducer} from "./moviesList/movies-list-slice"
import {moviesReducer} from "./movie/movie-slice"

export const rootReducer = combineReducers({
    moviesList: moviesListReducer,
    movies: moviesReducer,
})