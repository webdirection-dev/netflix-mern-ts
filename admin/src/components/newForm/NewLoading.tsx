import React from "react"
import {MdOutlineDriveFolderUpload} from "react-icons/md"

interface IPropsLoading {
    handleChangeText: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMovieAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    items: {[key: string]: string | number};
}

const NewLoading: React.FC<IPropsLoading> = ({handleChangeFile, handleChangeText, handleMovieAvatar, items}) => {

    return(
        <>
            <div className="loadImg">
                <div>
                    <label htmlFor='img' className='img'>
                        Image: <MdOutlineDriveFolderUpload className='icon'/>
                    </label>

                    <input
                        type='file'
                        id='img'
                        name='img'
                        style={{display: 'none'}}
                        // value={items.img || ''}
                        onChange={(e) => {
                            handleChangeFile(e)
                            handleMovieAvatar(e)
                        }}
                    />

                </div>

                <div>
                    <label htmlFor='imgTitle' className='img'>
                        Title image: <MdOutlineDriveFolderUpload className='icon'/>
                    </label>

                    <input
                        type='file'
                        id='imgTitle'
                        name='imgTitle'
                        style={{display: 'none'}}
                        // value={items.imgTitle || ''}
                        onChange={(e) => handleChangeFile(e)}
                    />
                </div>

                <div>
                    <label htmlFor='imgSmall' className='img'>
                        Thumbnail image: <MdOutlineDriveFolderUpload className='icon'/>
                    </label>

                    <input
                        type='file'
                        id='imgSmall'
                        name='imgSmall'
                        style={{display: 'none'}}
                        // value={items.imgSmall || ''}
                        onChange={(e) => handleChangeFile(e)}
                    />
                </div>
            </div>

            <div className="loadVideo">
                <div className="loadVideoForm">
                    <label htmlFor='trailer'>Trailer:</label>
                    <input
                        type='file'
                        id='trailer'
                        name='trailer'
                        onChange={(e) => handleChangeFile(e)}
                    />
                </div>

                <div className="loadVideoForm">
                    <label htmlFor='video'>Video:</label>
                    <input
                        type='file'
                        id='video'
                        name='video'
                        onChange={(e) => handleChangeFile(e)}
                    />
                </div>
            </div>

            <div className="isSeries">
                <label htmlFor='isSeries'>Is series?</label>

                <select
                    name='isSeries'
                    id='isSeries'
                    value={items.isSeries || ''}
                    onChange={e => handleChangeText(e)}
                >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                </select>
            </div>
        </>
    )
}

export default NewLoading