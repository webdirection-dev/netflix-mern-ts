import React, {SetStateAction, Dispatch} from "react"
import './popUpSubmitNew.scss'

import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineClose} from "react-icons/md"

import {usePopupSubmit} from "./use-popup-submit"
import {TypeInfoAboutItem} from "../../pages/new/use-upload-firebase"

interface IPropPopupNew {
    setIsShowPopup: Dispatch<SetStateAction<boolean>>;
    setIsResetMedia: Dispatch<SetStateAction<boolean>>;
    handleSwitchPopup: () => void;
    handleUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    infoAboutItem: TypeInfoAboutItem;
}

const PopUpSubmitNew: React.FC<IPropPopupNew> = (props) => {
    const {setIsShowPopup, setIsResetMedia, handleSwitchPopup, handleUpload, infoAboutItem} = props
    const {
        className,
        popStyle,
        notify,
        isSubmit,
        setIsSubmit,
    } = usePopupSubmit()

    return(
        <div className='popUp'>
            <div
                className={'container-popup ' + className}
                style={{
                    background: `${popStyle}`,
                }}
            >
                <div
                    title='Clear form and Сlose'
                    className={!isSubmit ? 'close visibility' : 'close hidden'}
                    onClick={() => {
                        handleSwitchPopup()
                        setIsResetMedia(true)
                    }}
                >
                    <div className='icon' title='Clear form and Сlose'>
                        <MdOutlineClose title='Clear form and Сlose'/>
                    </div>
                </div>

                <div className='content'>
                    <ul className="monitor showLogs">
                        <h3 className='title'>Information:</h3>

                        {
                            [...infoAboutItem].reverse().map((i) => (
                                <li key={i.name + String(Math.random())}>
                                    {i.name}: <span>{i.value}</span>
                                </li>
                            ))
                        }
                    </ul>

                    <h2>{isSubmit ? `${notify}` : 'Could you upload data?'}</h2>
                </div>

                <div className="footer">
                    <button
                        className={!isSubmit ? 'change slide-left' : 'change slide-left-hidden'}
                        onClick={() => setIsShowPopup(false)}
                    >CHANGE <MdKeyboardArrowLeft /></button>

                    <button
                        className={!isSubmit ? 'submit slide-right' : 'submit slide-right-hidden'}
                        onClick={(e) => {
                            setIsSubmit(true)
                            handleUpload(e)
                        }}
                    >SUBMIT <MdKeyboardArrowRight /></button>

                    {isSubmit && (
                        <button
                            className='closeBtn'
                            onClick={() => {
                                handleSwitchPopup()
                                setIsResetMedia(true)
                            }}
                        >CLOSE</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopUpSubmitNew