import {combineReducers} from "@reduxjs/toolkit"

import {moviesListReducer} from "./moviesList/movies-list-slice"

export const rootReducer = combineReducers({
    moviesList: moviesListReducer,
})