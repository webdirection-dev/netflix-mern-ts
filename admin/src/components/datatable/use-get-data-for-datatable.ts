import {useContext, useEffect} from "react"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {getMovies, deleteMovie} from "../../context/apiCalls"

import {moviesColumns} from "../../static-data/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    const context =
        type === 'movie' ? MovieContext : MovieContext

    const {dispatch} = useContext(context)
    const {movies} = useContext(MovieContext)

    const columns =
        type === 'movie' ? moviesColumns : []

    const rows =
        type === 'movie' ? movies : []

    const title = type[0].toUpperCase() + type.slice(1)

    const deleteItem = (id: string) => {
        deleteMovie(id, dispatch)
    }

    useEffect(() => {
        const getApi =
            type === 'movie' ? getMovies : Function()

        getApi(dispatch)
    }, [dispatch, type])

    return {columns, rows, title, deleteItem}
}