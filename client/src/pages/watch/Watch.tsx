import React from "react"
import {Link, useLocation} from 'react-router-dom'
import './watch.scss'

import {ArrowBackOutlined} from "@mui/icons-material"
import {IListItem} from "../../types";

interface IMovie {
    movie: IListItem
}

const Watch: React.FC = () => {
    const {movie} = useLocation().state as IMovie
    // console.log(movie)
    const {video} = movie


    return(
        <div className='watch'>
            <Link to='/'>
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>

            <video
                className='video'
                // src={video}
                src="https://webdirection.org/video/the-mari%CC%81as-hush.mp4"
                autoPlay
                controls

            ></video>
        </div>
    )
}

export default Watch