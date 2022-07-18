import React, {useContext, useEffect, useState} from "react"
import './moviesList.scss'
import {useMoviesList} from "./use-movies-list"
import {getMovies} from "../../context/apiCalls"

import {MovieContext} from "../../context/movieContext/MovieContext"
import {ListsContext} from "../../context/listsContext/ListsContext";

interface IMovieList {
    title: string;
}

const MoviesList: React.FC<IMovieList> = ({title}) => {
    const {lists, dispatch: dispatchList} = useContext(ListsContext)
    const {movies, dispatch: dispatchMovies} = useContext(MovieContext)

    const [isShowPopup, setIsShowPopup] = useState(false)
    const [movieList, setMovieList] = useState({})
    const {test} = useMoviesList()

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
    }

    useEffect(() => {
        getMovies(dispatchMovies)
    }, [dispatchMovies])

    return(
        <div className='moviesList'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <form>
                    <div className="formInput">
                        <label htmlFor='title'>Title</label>

                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder='list name'
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor='genre'>Genre</label>

                        <input
                            type='text'
                            id='genre'
                            name='genre'
                            placeholder='genre'
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="type">
                        <label htmlFor='type'>Type</label>

                        <select
                            name='type'
                            id='type'
                            onChange={e => handleChange(e)}
                        >
                            <option>Type</option>
                            <option value='movie'>Movie</option>
                            <option value='series'>Series</option>
                        </select>
                    </div>

                    <div className="content">
                        <label htmlFor='content'>Content</label>

                        <select
                            multiple={true}
                            name='content'
                            id='content'
                            onChange={e => handleSelect(e)}
                        >
                            {movies.map(i => {
                                return(
                                    <option key={i._id} value={i._id}>{i.title}</option>
                                )
                            })}
                        </select>
                    </div>
                </form>

                <button onClick={e => handleSubmit(e)}>CREATE</button>
            </div>
        </div>
    )
}

export default MoviesList