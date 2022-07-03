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
    const {
        imgUrl,
        handleChangeText,
        handleChangeFile,
        handleUpload,
        handleMovieAvatar,
        uploaded,
        handleSubmit,
        filesLength,
        isCheckItem,
        itemLength,
        filesLengthInItem,
    } = useUploadFirebase()
    const {title, data} = inputs

    return(
        <div className='new'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <div className="left">
                    <img src={imgUrl} alt="img"/>

                    {
                        title !== 'User' && (
                            <>
                                <NewLoading
                                    handleChangeFile={handleChangeFile}
                                    handleChangeText={handleChangeText}
                                    handleMovieAvatar={handleMovieAvatar}
                                />

                                {filesLength < 5 && <button className='disabled'>DISABLED</button>}
                                {uploaded < 5 && filesLength === 5 && <button onClick={e => handleUpload(e)}>UPLOAD</button>}
                                {uploaded === 5 && filesLength === 5 && <button className='disabled'>READY</button>}
                            </>
                        )
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
                    </form>

                    {!isCheckItem && <button className='disabled'>DISABLED</button>}
                    {isCheckItem && itemLength === 11 && <button onClick={e => handleSubmit(e)}>SEND</button>}
                    {isCheckItem && filesLengthInItem < 5 && <button className='disabled'>READY</button>}
                </div>
            </div>
        </div>
    )
}

export default New