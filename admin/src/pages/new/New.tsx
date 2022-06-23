import React, {useState} from "react"
import './new.scss'

import NewItem from "./NewItem"
import {INewFormInput} from "../../static-data/form-source"
import {MdOutlineDriveFolderUpload} from "react-icons/md";

interface INewForm {
    inputs: INewFormInput;
}

const New: React.FC<INewForm> = ({inputs}) => {
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
                <h1 className="title">{title}</h1>
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
                            <label htmlFor='file' className='img'>
                                Image: <MdOutlineDriveFolderUpload className='icon'/>
                            </label>

                            <input
                                type='file'
                                id='file'
                                style={{display: 'none'}}
                                onChange={(e) => handleSubmit(e)}
                            />
                        </div>

                        {data.map(i => <NewItem key={i.id} {...i}/>)}
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New