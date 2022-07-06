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
    const [isResetMedia, setIsResetMedia] = useState(false) // Перерендер для очистки формы
    const [isShowPopup, setIsShowPopup] = useState(false)
    const {
        imgUrl,
        handleChangeText,
        handleChangeFile,
        handleMovieAvatar,
        handleClearForm,
        handleUpload,
        isFilesFill,
        isCheckItem,
    } = useUploadFirebase()

    const handleShowPopup = () => {
        setTimeout(() => {
          setIsShowPopup(false)
        }, 10)

        handleClearForm()
    }

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
                                    handleMovieAvatar={handleMovieAvatar}
                                />

                                {!isFilesFill && <button className='disabled'>DISABLED</button>}
                                {isFilesFill && <button className='disabled'>READY</button>}
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

                        {
                            !isResetMedia &&
                            data.map(i => <NewItem key={i.id} handleChangeText={handleChangeText} {...i}/>)
                        }
                    </form>

                    {!isCheckItem && <button className='disabled'>DISABLED</button>}
                    {isCheckItem && isFilesFill && <button onClick={() => setIsShowPopup(true)}>SEND</button>}
                    {isCheckItem && !isFilesFill && <button className='disabled'>READY</button>}
                </div>
            </div>

            {isShowPopup &&
                <PopUpSubmitNew
                    handleShowPopup={handleShowPopup}
                    setIsShowPopup={setIsShowPopup}
                    setIsResetMedia={setIsResetMedia}
                    handleUpload={handleUpload}
                />
            }
        </div>
    )
}

export default New