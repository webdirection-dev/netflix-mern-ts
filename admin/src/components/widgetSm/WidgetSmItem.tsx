import React from "react"
import {MdVisibility} from "react-icons/md"

import {IUser} from "../../types"

const WidgetSmItem: React.FC<IUser> = (props) => {
    const {profilePic, username} = props

    return(
        <li className="widgetSmListItem">
            <img
                className="widgetSmImg"
                src={
                    profilePic ||
                    "https://img.photolamus.com/eoMrUbOH/x800/8383220f5e92cc0f6db2b2582b5f40b7/digital-cartoon-avatar-icon-hand-drawn-in-colored-style-from-your-photo.jpg"
                }
                alt="img"
            />

            <div className="widgetSmUser">
                <span className="widgetSmUsername">{username}</span>
            </div>

            <button className="widgetSmButton">
                <MdVisibility className="widgetSmIcon" />
                Display
            </button>
        </li>
    )
}

export default WidgetSmItem