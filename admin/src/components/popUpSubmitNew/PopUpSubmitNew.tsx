import React, {useEffect, SetStateAction, Dispatch} from "react"
import './popUpSubmitNew.scss'

import {useBgLogin} from "../imgBackground/use-bg-login"

import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineClose} from "react-icons/md";

interface IPropPopupNew {
    setIsShowPopup: Dispatch<SetStateAction<boolean>>;
    setIsResetMedia: Dispatch<SetStateAction<boolean>>;
    handleShowPopup: () => void;
    handleUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PopUpSubmitNew: React.FC<IPropPopupNew> = (props) => {
    const {setIsShowPopup, setIsResetMedia, handleShowPopup, handleUpload} = props

    const {className, src} = useBgLogin()
    const popStyle = ` 
        linear-gradient(0deg, transparent 0%, rgba(34,193,195,.5) 15%, rgba(34,193,195,.8) 50%, transparent 100%),
        center / cover no-repeat url(${src})
    `

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return(
        <div className='popUp'>
            <div
                className={'container-popup ' + className}
                style={{
                    background: `${popStyle}`,
                }}
            >
                <div
                    className='close'
                    onClick={() => {
                        handleShowPopup()
                        setIsResetMedia(true)
                    }}
                >
                    <div className='icon' title='Clear form and Сlose'>
                        <MdOutlineClose title='Clear form and Сlose'/>
                    </div>
                </div>

                <div className="content">
                    <div className="monitor">
                        ssadsadsdsad
                    </div>
                    <h2>Data is about to be sent...</h2>
                    <h2>All is ready!</h2>
                </div>

                <button
                    className='change'
                    onClick={() => setIsShowPopup(false)
                }>CHANGE <MdKeyboardArrowLeft /></button>

                <button
                    className='submit'
                    onClick={e => handleUpload(e)}
                >SUBMIT <MdKeyboardArrowRight /></button>
            </div>
        </div>
    )
}

export default PopUpSubmitNew