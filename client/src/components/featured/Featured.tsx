import React from "react"
import {InfoOutlined, PlayArrow} from "@mui/icons-material"

import './featured.scss'

interface IFeatured {
    type?: string
}

const Featured: React.FC<IFeatured> = ({type}) => {

    return(
        <div className="featured">
            {
                type && (
                    <div className="category">
                        <span>{type === 'movie' ? 'Movies' : 'TV Series'}</span>

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
                src="https://images.pexels.com/photos/11470876/pexels-photo-11470876.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="..."
            />

            <div className="info">
                <img
                    src="https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABeeMILAyu161f6TSuh-poQWNKfIo_pl9aeifrQ7noJsTYX78AbLCLDsPzCHSp7N0OfCGrU3nGDFtynNnZ3lKQbXuPgpbRObPUCcAPFgwtp2K.png?r=df1"
                    alt="..."/>

                <span className="description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut corporis cupiditate dicta eaque est ipsa laudantium temporibus ut. Accusamus architecto consequatur consequuntur dolorem eligendi fugiat illo nemo quibusdam veritatis?
                </span>

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