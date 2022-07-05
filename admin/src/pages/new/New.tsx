import React, {useEffect, useState} from "react"
import './new.scss'

import NewLoading from "../../components/newForm/NewLoading"
import NewItem from "../../components/newForm/NewItem"
import PopUpSubmitNew from "../../components/popUpSubmitNew/PopUpSubmitNew"

import {MdOutlineDriveFolderUpload} from "react-icons/md"

import {INewFormInput} from "../../types/types"

import {useUploadFirebase} from "./use-upload-firebase"

interface INewForm {
    inputs: INewFormInput;
}

const New: React.FC<INewForm> = ({inputs}) => {
    const {title, data} = inputs
    const [isResetMedia, setIsResetMedia] = useState(false)
    const [isShowPopup, setIsShowPopup] = useState(false)
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
        isFilesLengthInItem,
        items,
    } = useUploadFirebase()

    useEffect(() => {
        setIsResetMedia(false)
    }, [isResetMedia])

    return(
        <div className='new'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <div className="left">
                    <img src={imgUrl} alt="img"/>

                    {
                        title !== 'User' && !isResetMedia && (
                            <>
                                <NewLoading
                                    handleChangeFile={handleChangeFile}
                                    handleChangeText={handleChangeText}
                                    handleMovieAvatar={handleMovieAvatar}
                                    items={items}
                                />

                                {filesLength < 5 && <button className='disabled'>DISABLED</button>}
                                {/*{uploaded < 5 && filesLength === 5 && <button onClick={e => handleUpload(e)}>UPLOAD</button>}*/}
                                {/*{uploaded === 5 && filesLength === 5 && <button className='disabled'>READY</button>}*/}
                                {filesLength === 5 && <button className='disabled'>READY</button>}
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

                        {data.map(i => <NewItem key={i.id} handleChangeText={handleChangeText} items={items} {...i}/>)}
                    </form>

                    {!isCheckItem && <button className='disabled'>DISABLED</button>}
                    {/*{isCheckItem && isFilesLengthInItem && <button onClick={e => handleSubmit(e)}>SEND</button>}*/}
                    {/*{isCheckItem && !isFilesLengthInItem && <button className='disabled'>READY</button>}*/}
                    {isCheckItem && filesLength === 5 && <button onClick={() => setIsShowPopup(true)}>SEND</button>}
                    {isCheckItem && filesLength < 5 && <button className='disabled'>READY</button>}
                </div>
            </div>

            {isShowPopup &&
                <PopUpSubmitNew
                    setIsShowPopup={setIsShowPopup}
                    setIsResetMedia={setIsResetMedia}
                />
            }
        </div>
    )
}

export default New