import React, {useState} from "react"
import {IMovie} from "../../types/types"
import {MdCheck, MdOutlineDriveFolderUpload, MdPublish} from "react-icons/md"
import {movieInputs} from "../../static-data/data/form-source";
import {noImg} from "../../static-data/img";

interface IUserCard {
    item: IMovie;
    titleCard: string;
}

const ViewMovie: React.FC<IUserCard> = ({item, titleCard}) => {
    const [movieAvatar, setMovieAvatar] = useState('' as string | File)
    const [isEdit, setIsEdit] = useState(false)
    const {_id, title, description, img, imgTitle, imgSm, trailer, video, year, limit, genre, isSeries} = item

    const imgUrl = movieAvatar ? URL.createObjectURL(movieAvatar as Blob | MediaSource) : img

    const handleMovieAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setMovieAvatar(localFile[0])
        }
    }

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
                                <span className="itemKey">Title:</span>
                                <span className="itemValue">{title}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Description:</span>
                                <span className="itemValue">{description}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Year:</span>
                                <span className="itemValue">{year}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Genre:</span>
                                <span className="itemValue">{genre}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Limit:</span>
                                <span className="itemValue">{limit}</span>
                            </div>

                            <div className="detailItem">
                                <span className="itemKey">Type:</span>
                                <span className="itemValue">{isSeries ? 'series' : 'movie'}</span>
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

                <div className="left">
                    <img src={imgUrl} alt="img"/>

                    <form className="loadImg">
                        {
                            movieInputs.loadingMedia.map(i => {

                                if (i.flag === 'image') {
                                    return (
                                        <div key={i.id} className='inputMedia'>
                                            {/*{files[i.htmlId] && <MdCheck className='check'/>}*/}

                                            <label htmlFor={i.htmlId} className='img'>
                                                {i.label} <MdOutlineDriveFolderUpload className='icon'/>
                                            </label>

                                            <input
                                                type='file'
                                                id={i.htmlId}
                                                name={i.htmlId}
                                                style={{display: 'none'}}
                                                onChange={(e) => {
                                                    if (i.htmlId === 'img') {
                                                        handleMovieAvatar(e)
                                                        // handleChangeFile(e)
                                                    } else {
                                                        // handleChangeFile(e)
                                                    }
                                                }}
                                            />
                                        </div>
                                    )
                                } else return null
                            })
                        }
                    </form>

                    <div className="loadVideo">
                        {
                            movieInputs.loadingMedia.map(i => {
                                if (i.flag === 'media') {
                                    return (
                                        <div key={i.id} className="loadVideoForm">
                                            {/*{files[i.htmlId] && <MdCheck className='check'/>}*/}

                                            <label htmlFor={i.htmlId}>{i.label}</label>
                                            <input
                                                type='file'
                                                id={i.htmlId}
                                                name={i.htmlId}
                                                // onChange={(e) => handleChangeFile(e)}
                                            />
                                        </div>
                                    )
                                } else return null
                            })
                        }
                    </div>
                </div>

                <form className="right">
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder={title}
                    />

                    <label htmlFor='description'>Description:</label>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        placeholder={description}
                    />

                    <label htmlFor='year'>Year:</label>
                    <input
                        type='text'
                        id='year'
                        name='year'
                        placeholder={year}
                    />

                    <label htmlFor='genre'>Genre:</label>
                    <input
                        type='text'
                        id='genre'
                        name='genre'
                        placeholder={genre}
                    />

                    <label htmlFor='limit'>Limit:</label>
                    <input
                        type='text'
                        id='limit'
                        name='limit'
                        placeholder={String(limit)}
                    />

                    <label htmlFor='isSeries'>Is series?</label>

                    <select
                        name='isSeries'
                        id='isSeries'
                    >
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>

                    <button className="editButton">Update</button>
                </form>
            </div>
        </>
    )
}

export default ViewMovie




// import React, {useState} from "react"
// import {IMovie} from "../../types/types"
// import { MdPublish } from "react-icons/md"
//
// interface IUserCard {
//     item: IMovie;
//     titleCard: string;
// }
//
// const ViewMovie: React.FC<IUserCard> = ({item, titleCard}) => {
//     const [isEdit, setIsEdit] = useState(false)
//     const {_id, title, description, img, imgTitle, imgSm, trailer, video, year, limit, genre, isSeries} = item
//
//     return(
//         <>
//             <div className="top">
//                 <div className="left">
//
//                     <div
//                         className="editButton"
//                         onClick={() => setIsEdit(!isEdit)}
//                     >Edit</div>
//
//                     <h1 className="title">{titleCard} information</h1>
//
//                     <div className="item">
//                         <img src={img} alt={title}/>
//
//                         <div className="details">
//                             <h1 className="itemTitle">{title}</h1>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">ID:</span>
//                                 <span className="itemValue">{_id}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Title:</span>
//                                 <span className="itemValue">{title}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Description:</span>
//                                 <span className="itemValue">{description}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Year:</span>
//                                 <span className="itemValue">{year}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Genre:</span>
//                                 <span className="itemValue">{genre}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Limit:</span>
//                                 <span className="itemValue">{limit}</span>
//                             </div>
//
//                             <div className="detailItem">
//                                 <span className="itemKey">Type:</span>
//                                 <span className="itemValue">{isSeries ? 'series' : 'movie'}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className={isEdit ? 'bottom' : 'hide'}>
//                 <div
//                     className="closeButton"
//                     onClick={() => setIsEdit(false)}
//                 >Close</div>
//
//                 <form className="editForm">
//                     <div className="editFormLeft">
//                         <label>Movie Title</label>
//                         <input type="text" placeholder={title}/>
//
//                         <label>Year</label>
//                         <input type="text" placeholder={year}/>
//
//                         <label>Genre</label>
//                         <input type="text" placeholder={genre}/>
//
//                         <label>Limit</label>
//                         <input type="text" placeholder={String(limit)}/>
//
//                         <label>Trailer</label>
//                         <input type="file" placeholder={trailer}/>
//
//                         <label>Video</label>
//                         <input type="file" placeholder={video}/>
//                     </div>
//
//                     <div className="editFormRight">
//                         <div className="upload">
//                             <label htmlFor="file">
//                                 <img
//                                     src={img}
//                                     alt={title}
//                                     className="uploadImg"
//                                 />
//
//                                 <MdPublish className='icon'/>
//                             </label>
//
//                             <input type="file" id="file" style={{display: "none"}}/>
//                         </div>
//
//                         <button className="editButton">Update</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }
//
// export default ViewMovie