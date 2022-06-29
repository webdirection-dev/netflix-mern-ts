import {IMovie} from "../../types/types"

//GET
export const getMoviesStart = () => ({
    type: 'GET_MOVIES_START',
})

export const getMoviesSuccess = (movies: IMovie[]) => ({
    type: 'GET_MOVIES_SUCCESS',
    payload: movies,
})

export const getMoviesFailure = () => ({
    type: 'GET_MOVIES_FAILURE',
})

//DELETE
export const deleteMovieStart = () => ({
    type: 'DELETE_MOVIE_START'
})

export const deleteMoviesSuccess = (id: string) => ({
    type: 'DELETE_MOVIES_SUCCESS',
    payload: id,
})

export const deleteMoviesFailure = () => ({
    type: 'DELETE_MOVIES_FAILURE',
})