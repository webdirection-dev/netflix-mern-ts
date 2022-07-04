import React from "react"
import {MdOutlineDriveFolderUpload} from "react-icons/md"
import {INewItemInput} from "../../types/types"

interface IPropsNewInput extends INewItemInput{
    handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void
    items: {[key: string]: string | number}
}

const NewItem: React.FC<IPropsNewInput> = (props) => {
    const {id, htmlId, label, type, placeholder, handleChangeText, items} = props

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
                name={htmlId}
                placeholder={placeholder}
                style={id === 0 ? {display: 'none'} : undefined}
                value={items[htmlId] || ''}
                onChange={e => handleChangeText(e)}
            />
        </div>
    )
}

export default NewItem