import React from "react"
import './single.scss'

import UserCard from "../../components/userCard/UserCard"
import MovieCard from "../../features/movie/MovieCard"
import MoviesListCard from "../../features/moviesList/MoviesListCard"

import {useGetSingleData} from "./use-get-single-data"
import {IUserRows, IMovie, IList} from "../../types/types"

const Single: React.FC = () => {
    const {titleCard, props} = useGetSingleData()

    return(
        <div className='single'>
            { titleCard === 'User' && <UserCard item={props as IUserRows} titleCard={titleCard}/> }
            { titleCard === 'Movie' && <MovieCard item={props as IMovie} titleCard={titleCard}/> }
            { titleCard === 'List' && <MoviesListCard item={props as IList} titleCard={titleCard}/> }
        </div>
    )
}

export default Single