import {useContext, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../../hooks/hookRedux"

import {selectAllMoviesLists, removeMoviesList} from "../../features/moviesList/movies-list-slice"
import {selectAllMovies, removeMovies} from "../../features/movie/movie-slice"

import {moviesColumns, listsColumns} from "../../static-data/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    const dispatch = useAppDispatch()
    const lists = useAppSelector(state => selectAllMoviesLists(state))
    const movies = useAppSelector(state => selectAllMovies(state))

    const columns =
        type === 'movie' ? moviesColumns :
        type === 'list' ? listsColumns : []

    const rows =
        type === 'movie' ? movies :
        type === 'list' ? lists : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = (id: string) => {
        if (type === 'movie') dispatch(removeMovies(id))
        if (type === 'list') dispatch(removeMoviesList(id))
    }

    return {columns, rows, title, deleteItem}
}