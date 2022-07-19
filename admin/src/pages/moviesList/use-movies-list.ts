import {useNavigate} from "react-router-dom"
import React, {useContext, useEffect, useState} from "react"
import {ListsContext} from "../../context/listsContext/ListsContext"
import {MovieContext} from "../../context/movieContext/MovieContext"
import {createList, getMovies} from "../../context/apiCalls"

interface IList {
    [key: string]: string | string[]
}

export const useMoviesList = () => {
    const navigate = useNavigate()
    const {dispatch: dispatchList} = useContext(ListsContext)
    const {movies, dispatch: dispatchMovies} = useContext(MovieContext)

    const [movieList, setMovieList] = useState({} as IList)
    const [isAllReady, setIsAllReady] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setMovieList({
            ...movieList,
            [name]: value
        })
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name} = e.target

        let value = Array.from(e.target.selectedOptions, i => i.value)

        setMovieList({
            ...movieList,
            [name]: value
        })
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (isAllReady) {
            createList(movieList, dispatchList)
            navigate('../')
        } else navigate('../')
    }

    useEffect(() => {
        getMovies(dispatchMovies)
    }, [dispatchMovies])

    useEffect(() => {
        for (let key in movieList) {
            if (
                (movieList.title && movieList.title !== '') &&
                (movieList.genre && movieList.genre !== '') &&
                movieList.content
            ) setIsAllReady(true)
            else setIsAllReady(false)
        }
    }, [movieList])

    return {
        isAllReady,
        movies,
        handleChange,
        handleSelect,
        handleSubmit,
    }
}