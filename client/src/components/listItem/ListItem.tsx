import React, {useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import axios from "axios"

import './listItem.scss'
import {Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined} from "@mui/icons-material"
import {IMovieInfo} from "../../types"

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTU4OTlmNGViYzAwYjcwOTZmNzA3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTE5MzE3MCwiZXhwIjoxNjU1Mjc5NTcwfQ.G_RYpzaiCBDbZ-dCRfwfPtgds6V6qcB7_tV3LNaiTIU'

interface IListProps {
    item: string;
    index: number;
}

const ListItem: React.FC<IListProps> = ({item, index}) => {
    const trailerTest = 'https://webdirection.org/video/the-mari%CC%81as-hush.mp4'

    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({} as IMovieInfo)
    const {title, img, imgTitle, trailer, duration, limit, year, description, genre} = movie

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(
                    '/movies/find/'+item,
                    {
                        headers: {
                            authorization: token,
                        }
                    },
                )

                setMovie(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        getMovie()
    }, [item])

    const classesListItem = isHovered ? 'listItem' : 'hidden'

    return(
        <Link to='/watch' state={{ movie: movie }}>
        {/*<Link to={{pathname: '/watch', movie: movie}}>*/}
            <div
                className='listItemWrapper'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    className='imgPreview'
                    // src={img}
                    src="https://oxvo.ru/wp-content/uploads/2017/02/Dirk-Gentlys-Holistic-Detective-Agency.jpg"
                    alt={imgTitle}
                />

                <div
                    className={classesListItem}
                    style={{left: (isHovered && (index * 225 - 50) + (index * 2.5)) as number}}
                >
                    <img
                        // src={img}
                        src="https://oxvo.ru/wp-content/uploads/2017/02/Dirk-Gentlys-Holistic-Detective-Agency.jpg"
                        alt={imgTitle}
                    />

                    {isHovered && (
                        <video autoPlay={true} loop muted>
                            <source
                                src={trailerTest}
                                type='video/mp4'
                            />
                        </video>
                    )}

                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className='icon' />
                            <Add className='icon' />
                            <ThumbUpAltOutlined className='icon' />
                            <ThumbDownAltOutlined className='icon' />
                        </div>

                        <div className="itemInfoTop">
                            <span>{duration}</span>
                            <span className='limit'>+{limit}</span>
                            <span>{year}</span>
                        </div>

                        <div className="description">{description}</div>

                        <div className="genre">{genre}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListItem