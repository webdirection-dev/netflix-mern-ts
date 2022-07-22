import React, {useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {useAppDispatch} from "../../hooks/hookRedux"
import {updateMoviesList} from "../../features/moviesList/movies-list-slice"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {getMovies} from "../../context/apiCalls"

export const useMoviesListCard = (_id: string, type: string, content: string[]) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [updateMovie, setUpdateMovie] = useState({type, content})

    const {movies, dispatch: dispatchMovies} = useContext(MovieContext)

    const handleEdit = () => {
        if (!isEdit) setIsEdit(true)
        else navigate('../')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUpdateMovie({
            ...updateMovie,
            [name]: value
        })
    }

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(updateMoviesList({_id, updateMovie}))
        navigate('../')
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name} = e.target

        let value = Array.from(e.target.selectedOptions, i => i.value)

        if (value.length > 0) {
            setUpdateMovie({
                ...updateMovie,
                [name]: value
            })
        }
        if (value.length < 1) {
            setUpdateMovie({
                ...updateMovie,
                [name]: content
            })
        }
    }

    useEffect(() => {
        getMovies(dispatchMovies)
    }, [dispatchMovies])

    return {isEdit, handleChange, handleUpdate, handleEdit, handleSelect, movies}
}



// import React, {useContext, useEffect, useState} from "react"
// import {useNavigate} from "react-router-dom"
//
// import {ListsContext} from "../../context/listsContext/ListsContext"
// import {MovieContext} from "../../context/movieContext/MovieContext"
// import {getMovies, updateList} from "../../context/apiCalls"
//
// export const useMoviesListCard = (_id: string, type: string, content: string[]) => {
//     const navigate = useNavigate()
//     const {dispatch} = useContext(ListsContext)
//     const {movies, dispatch: dispatchMovies} = useContext(MovieContext)
//     const [isEdit, setIsEdit] = useState(false)
//     const [updateMovie, setUpdateMovie] = useState({type, content})
//
//     const handleEdit = () => {
//         if (!isEdit) setIsEdit(true)
//         else navigate('../')
//     }
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const {name, value} = e.target
//         setUpdateMovie({
//             ...updateMovie,
//             [name]: value
//         })
//     }
//
//     const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         e.preventDefault()
//         updateList(_id as string, updateMovie, dispatch)
//         navigate('../')
//     }
//
//     const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const {name} = e.target
//
//         let value = Array.from(e.target.selectedOptions, i => i.value)
//
//         if (value.length > 0) {
//             setUpdateMovie({
//                 ...updateMovie,
//                 [name]: value
//             })
//         }
//         if (value.length < 1) {
//             setUpdateMovie({
//                 ...updateMovie,
//                 [name]: content
//             })
//         }
//     }
//
//     useEffect(() => {
//         getMovies(dispatchMovies)
//     }, [dispatchMovies])
//
//     return {isEdit, handleChange, handleUpdate, handleEdit, handleSelect, movies}
// }