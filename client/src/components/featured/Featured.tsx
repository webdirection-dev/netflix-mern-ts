import React, {useEffect, useState} from "react"
import {InfoOutlined, PlayArrow} from "@mui/icons-material"
import axios from "axios"

import {IMovieInfo} from "../../types"
import './featured.scss'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTU4OTlmNGViYzAwYjcwOTZmNzA3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTE5MzE3MCwiZXhwIjoxNjU1Mjc5NTcwfQ.G_RYpzaiCBDbZ-dCRfwfPtgds6V6qcB7_tV3LNaiTIU'

interface IFeatured {
    type?: string
}

const Featured: React.FC<IFeatured> = ({type}) => {
    const [content, setContent] = useState({} as IMovieInfo)
    const {title, img, imgTitle, description} = content

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(
                    `/movies/random?type=${type}`,
                    {
                        headers: {
                            authorization: token,
                        },
                    },
                )

                setContent(res.data[0])
            } catch (err) {
                console.error(err)
            }
        }

        getRandomContent()
    }, [type])

    return(
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type === 'movies' ? 'Movies' : 'Series'}</span>

                        <select name="genre" id="genre">
                            <option>Genre</option>
                            <option value='adventure'>Adventure</option>
                            <option value='comedy'>Comedy</option>
                            <option value='crime'>Crime</option>
                            <option value='fantasy'>Fantasy</option>
                            <option value='historical'>Historical</option>
                            <option value='horror'>Horror</option>
                            <option value='romance'>Romance</option>
                            <option value='sci-fi'>Sci-fi</option>
                            <option value='thriller'>Thriller</option>
                            <option value='western'>Western</option>
                            <option value='animation'>Animation</option>
                            <option value='drama'>Drama</option>
                            <option value='documentary'>Documentary</option>
                        </select>
                    </div>
                )
            }

            <img
                // src={img}
                src="https://oxvo.ru/wp-content/uploads/2017/02/Dirk-Gentlys-Holistic-Detective-Agency.jpg"
                alt={title}
            />

            <div className="info">
                <img
                    // src={imgTitle}
                    src="https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABeeMILAyu161f6TSuh-poQWNKfIo_pl9aeifrQ7noJsTYX78AbLCLDsPzCHSp7N0OfCGrU3nGDFtynNnZ3lKQbXuPgpbRObPUCcAPFgwtp2K.png?r=df1"
                    alt={title}
                />

                <span className="description">{description}</span>

                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>

                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured