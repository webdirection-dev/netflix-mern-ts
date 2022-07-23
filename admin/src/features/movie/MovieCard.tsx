import React, {useState} from "react"
import {IMovie} from "../../types/types"
import { MdPublish } from "react-icons/md"

interface IUserCard {
    item: IMovie;
    titleCard: string;
}

const MovieCard: React.FC<IUserCard> = ({item, titleCard}) => {
    const [isEdit, setIsEdit] = useState(false)
    const {_id, title, description, img, imgTitle, imgSm, trailer, video, year, limit, genre, isSeries} = item

    return(
        <>
            <div className="top">
                <div className="left">

                    <div
                        className="editButton"
                        onClick={() => setIsEdit(!isEdit)}
                    >Edit</div>

                    <h1 className="title">{titleCard} information</h1>

                    <div className="item">
                        <img src={img} alt={title}/>

                        <div className="details">
                            <h1 className="itemTitle">{title}</h1>

                            <div className="detailItem">
                                <span className="itemKey">ID:</span>
                                <span className="itemValue">{_id}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Genre:</span>
                                <span className="itemValue">{genre}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Year:</span>
                                <span className="itemValue">{year}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Limit:</span>
                                <span className="itemValue">{limit}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Description:</span>
                                <span className="itemValue">{description}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={isEdit ? 'bottom' : 'hide'}>
                <div
                    className="closeButton"
                    onClick={() => setIsEdit(false)}
                >Close</div>

                <form className="editForm">
                    <div className="editFormLeft">
                        <label>Movie Title</label>
                        <input type="text" placeholder={title}/>

                        <label>Year</label>
                        <input type="text" placeholder={year}/>

                        <label>Genre</label>
                        <input type="text" placeholder={genre}/>

                        <label>Limit</label>
                        <input type="text" placeholder={String(limit)}/>

                        <label>Trailer</label>
                        <input type="file" placeholder={trailer}/>

                        <label>Video</label>
                        <input type="file" placeholder={video}/>
                    </div>

                    <div className="editFormRight">
                        <div className="upload">
                            <label htmlFor="file">
                                <img
                                    src={img}
                                    alt={title}
                                    className="uploadImg"
                                />

                                <MdPublish className='icon'/>
                            </label>

                            <input type="file" id="file" style={{display: "none"}}/>
                        </div>

                        <button className="editButton">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MovieCard