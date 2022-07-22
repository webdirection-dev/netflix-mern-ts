import {useContext, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../../hooks/hookRedux"

import {
    selectAllMoviesLists,
    loadMoviesLists,
    removeMoviesList
} from "../../features/moviesList/movies-list-slice"

import {moviesColumns, listsColumns} from "../../static-data/data/datatable-data"
import {MovieContext} from "../../context/movieContext/MovieContext"

import {
    getMovies,
    deleteMovie,
} from "../../context/apiCalls"

export const useGetDataForDatatable = (type: string) => {
    const dispatch = useAppDispatch()
    const lists = useAppSelector(state => selectAllMoviesLists(state))

    const movieDispatch = useContext(MovieContext).dispatch

    const {movies} = useContext(MovieContext)

    const columns =
        type === 'movie' ? moviesColumns :
        type === 'list' ? listsColumns : []

    const rows =
        type === 'movie' ? movies :
        type === 'list' ? lists : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = (id: string) => {
        if (type === 'movie') deleteMovie(id, movieDispatch)
        if (type === 'list') dispatch(removeMoviesList(id))
    }

    useEffect(() => {
        if (type === 'movie') getMovies(movieDispatch)
        if (type === 'list') dispatch(loadMoviesLists())
    }, [type, movieDispatch])

    return {columns, rows, title, deleteItem}
}


// import {useContext, useEffect} from "react"
//
// import {moviesColumns, listsColumns} from "../../static-data/data/datatable-data"
//
// import {MovieContext} from "../../context/movieContext/MovieContext"
// import {ListsContext} from "../../context/listsContext/ListsContext"
//
// import {
//     getMovies,
//     deleteMovie,
//     getLists,
//     deleteList,
// } from "../../context/apiCalls"
//
// export const useGetDataForDatatable = (type: string) => {
//     const movieDispatch = useContext(MovieContext).dispatch
//     const listDispatch = useContext(ListsContext).dispatch
//
//     const {movies} = useContext(MovieContext)
//     const {lists} = useContext(ListsContext)
//     console.log(lists)
//
//     const columns =
//         type === 'movie' ? moviesColumns :
//         type === 'list' ? listsColumns : []
//
//     const rows =
//         type === 'movie' ? movies :
//         type === 'list' ? lists : []
//
//     const title = type[0].toUpperCase() + type.slice(1)
//
//     const deleteItem = (id: string) => {
//         if (type === 'movie') deleteMovie(id, movieDispatch)
//         if (type === 'list') deleteList(id, listDispatch)
//     }
//
//     useEffect(() => {
//         if (type === 'movie') getMovies(movieDispatch)
//         if (type === 'list') getLists(listDispatch)
//     }, [type, movieDispatch, listDispatch])
//
//     return {columns, rows, title, deleteItem}
// }