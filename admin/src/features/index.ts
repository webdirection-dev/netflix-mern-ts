import {combineReducers} from "@reduxjs/toolkit"

import {moviesListReducer} from "./lists/movies-list-slice"
import {moviesReducer} from "./movies/movies-slice"

export const rootReducer = combineReducers({
    moviesList: moviesListReducer,
    movies: moviesReducer,
})