import React from "react"
import './new.scss'

import NewLoading from "../../components/newForm/NewLoading"
import NewItem from "../../components/newForm/NewItem"

import {MdOutlineDriveFolderUpload} from "react-icons/md"
import {INewFormInput} from "../../types/types"

import {useUploadFirebase} from "./use-upload-firebase"

interface INewForm {
    inputs: INewFormInput;
}

const New: React.FC<INewForm> = ({inputs}) => {
    const {handleChangeText, handleChangeFile, handleUpload, uploaded} = useUploadFirebase()
    const {title, data} = inputs
    const imgUrl = 'https://firebasestorage.googleapis.com/v0/b/netflix-a1cac.appspot.com/o/static-ui-images%2Fno-images.png?alt=media&token=662c7049-5349-48e1-9620-b0399764fa8a'
    return(
        <div className='new'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <div className="left">
                    <img src={imgUrl} alt="img"/>

                    {
                        title === 'Movie' && <NewLoading handleChangeFile={handleChangeFile} handleChangeText={handleChangeText}/>
                    }
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

                        {
                            uploaded === 5
                                ? <button>Send</button>
                                : <button onClick={e => handleUpload(e)}>Upload</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default New