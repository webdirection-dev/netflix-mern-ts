import React from "react"
import {MdOutlineDriveFolderUpload} from "react-icons/md"
import {INewItemInput} from "../../static-data/form-source"

const NewItem: React.FC<INewItemInput> = (props) => {
    const {id, htmlId, label, type, placeholder} = props

    return(
        <div className="formInput">
            <label
                htmlFor={htmlId}
                className={id === 0 ? 'img' : undefined}
            >
                {label}
                {id === 0 ? <MdOutlineDriveFolderUpload className='icon'/> : null}
            </label>

            <input
                type={type}
                id={htmlId}
                placeholder={placeholder}
                style={id === 0 ? {display: 'none'} : undefined}
            />
        </div>
    )
}

export default NewItem