import {useContext, useEffect} from "react"

import {moviesColumns, listsColumns} from "../../static-data/data/datatable-data"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {ListsContext} from "../../context/listsContext/ListsContext"

import {
    getMovies,
    deleteMovie,
    getLists,
    deleteList,
} from "../../context/apiCalls"

export const useGetDataForDatatable = (type: string) => {
    const movieDispatch = useContext(MovieContext).dispatch
    const listDispatch = useContext(ListsContext).dispatch

    const {movies} = useContext(MovieContext)
    const {lists} = useContext(ListsContext)

    const columns =
        type === 'movie' ? moviesColumns :
        type === 'list' ? listsColumns : []

    const rows =
        type === 'movie' ? movies :
        type === 'list' ? lists : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = (id: string) => {
        if (type === 'movie') deleteMovie(id, movieDispatch)
        if (type === 'list') deleteList(id, listDispatch)
    }

    useEffect(() => {
        if (type === 'movie') getMovies(movieDispatch)
        if (type === 'list') getLists(listDispatch)
    }, [type, movieDispatch, listDispatch])

    return {columns, rows, title, deleteItem}
}