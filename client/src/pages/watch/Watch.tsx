import React from "react"
import './watch.scss'

import {ArrowBackOutlined} from "@mui/icons-material"

const Watch: React.FC = () => {

    return(
        <div className='watch'>
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>

            <video
                className='video'
                src="https://webdirection.org/video/the-mari%CC%81as-hush.mp4"
                autoPlay
                // progress={true}
                controls

            ></video>
        </div>
    )
}

export default Watch