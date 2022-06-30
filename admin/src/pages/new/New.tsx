import React, {useState} from "react"
import './new.scss'

import NewItem from "./NewItem"
import {INewFormInput} from "../../types/types"

import {MdOutlineDriveFolderUpload} from "react-icons/md"

interface INewForm {
    inputs: INewFormInput;
}

const New: React.FC<INewForm> = ({inputs}) => {
    const [newItem, setNewItem] = useState({})

    const [file, setFile] = useState('' as string | File)
    const {title, data} = inputs
    const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJgwdOAjqaZGS7kn35IVm_ZN6E4XFuJ7V_g&usqp=CAU'

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setFile(localFile[0])
        }
    }

    return(
        <div className='new'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <div className="left">
                    <img
                        src={file ? URL.createObjectURL(file as Blob | MediaSource) : imgUrl}
                        alt="img"
                    />
                </div>

                <div className="right">
                    <form>
                        <div className="formInput">
                            <label htmlFor='img' className='img'>
                                Image: <MdOutlineDriveFolderUpload className='icon'/>
                            </label>

                            <input
                                type='file'
                                id='img'
                                name='img'
                                style={{display: 'none'}}
                                onChange={(e) => handleSubmit(e)}
                            />
                        </div>

                        <div className="formInput">
                            <label htmlFor='imgTitle' className='img'>
                                Title image: <MdOutlineDriveFolderUpload className='icon'/>
                            </label>

                            <input
                                type='file'
                                id='imgTitle'
                                name='imgTitle'
                                style={{display: 'none'}}
                                onChange={(e) => handleSubmit(e)}
                            />
                        </div>

                        <div className="formInput">
                            <label htmlFor='imgSmall' className='img'>
                                Thumbnail image: <MdOutlineDriveFolderUpload className='icon'/>
                            </label>

                            <input
                                type='file'
                                id='imgSmall'
                                name='imgSmall'
                                style={{display: 'none'}}
                                onChange={(e) => handleSubmit(e)}
                            />
                        </div>

                        {data.map(i => <NewItem key={i.id} {...i}/>)}

                        <div className="formInput">
                            <label htmlFor='isSerials'>Is Series?</label>

                            <select name='active' id='isSerials'>
                                <option value='false'>No</option>
                                <option value='true'>Yes</option>
                            </select>
                        </div>

                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New