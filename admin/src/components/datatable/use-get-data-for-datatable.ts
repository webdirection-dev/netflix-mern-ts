import {useContext, useEffect} from "react"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {getMovies} from "../../context/apiCalls"

import {moviesColumns, userColumns, userRows} from "../../static-data/data/datatable-data"

export const useGetDataForDatatable = (type: string) => {
    const {movies} = useContext(MovieContext)

    const context =
        type === 'movies' ? MovieContext :
        type === 'user' ? MovieContext : MovieContext

    const columns =
        type === 'movies' ? moviesColumns :
        type === 'users' ? userColumns : []

    const rows =
        type === 'movies' ? movies :
        type === 'users' ? userRows : []

    const title =
        type === 'movies' ? 'Add New Movie' :
        type === 'users' ? 'Add New User' : ''

    const {dispatch} = useContext(context)

    useEffect(() => {
        const getApi =
            type === 'movies' ? getMovies :
            type === 'users' ? getMovies : Function()

        getApi(dispatch)
    }, [dispatch, type])

    return {columns, rows, title}
}