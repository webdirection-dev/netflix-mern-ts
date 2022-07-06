import React from "react"
import {MdOutlineDriveFolderUpload} from "react-icons/md"
import {INewItemInput} from "../../types/types"

interface IPropsNewInput extends INewItemInput{
    handleChangeText: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

const NewItem: React.FC<IPropsNewInput> = (props) => {
    const {id, htmlId, label, type, placeholder, handleChangeText} = props

    return(
        <>
            {type !== '' && (
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
                        onChange={e => handleChangeText(e)}
                    />
                </div>
            )}

            {type === '' && (
                <div className="isSeries">
                    <label htmlFor='isSeries'>Is series?</label>

                    <select
                        name='isSeries'
                        id='isSeries'
                        onChange={e => handleChangeText(e)}
                    >
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>
                </div>
            )}
        </>

    )
}

export default NewItem