import React, {useState} from "react"
import './new.scss'

import NewLoading from "../../components/newForm/NewLoading"
import NewItem from "../../components/newForm/NewItem"

import {MdOutlineDriveFolderUpload} from "react-icons/md"

import {INewFormInput} from "../../types/types"

interface INewForm {
    inputs: INewFormInput;
}

const New: React.FC<INewForm> = ({inputs}) => {
    // const [file, setFile] = useState('' as string | File)
    const [item, setItem] = useState({})
    const [files, setFiles] = useState({})

    const {title, data} = inputs
    const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJgwdOAjqaZGS7kn35IVm_ZN6E4XFuJ7V_g&usqp=CAU'

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name

        setItem({
            ...item,
            [name]: value
        })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.files
        const name = e.target.name

        if (value !== null) {
            setFiles({
                ...files,
                [name]: value[0]
            })
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
                        src={imgUrl}
                        // src={file ? URL.createObjectURL(file as Blob | MediaSource) : imgUrl}
                        alt="img"
                    />

                    {title === 'Movie' && <NewLoading handleChangeFile={handleChangeFile} handleChangeText={handleChangeText}/>}
                </div>

                <div className="right">
                    <form>
                        {title === 'User' && (
                            <div className='formInput'>
                                <label htmlFor='img' className='img'>
                                    Image: <MdOutlineDriveFolderUpload className='icon'/>
                                </label>

                                <input
                                    type='file'
                                    id='img'
                                    name='img'
                                    style={{display: 'none'}}
                                    onChange={(e) => handleChangeFile(e)}
                                />
                            </div>
                        )}

                        {data.map(i => <NewItem key={i.id} handleChangeText={handleChangeText} {...i}/>)}
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New