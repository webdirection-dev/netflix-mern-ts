import React, {useState} from "react"
import './moviesList.scss'
import {useMoviesList} from "./use-movies-list"

import {INewFormInput} from "../../types/types"

interface INewForm {
    inputs: INewFormInput;
}

const MoviesList: React.FC<INewForm> = ({inputs}) => {
    const {title, data} = inputs
    const [isShowPopup, setIsShowPopup] = useState(false)
    const {test} = useMoviesList()

    return(
        <div className='moviesList'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom"></div>
        </div>
    )
}

export default MoviesList