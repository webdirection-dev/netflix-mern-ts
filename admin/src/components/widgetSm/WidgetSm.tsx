import React from "react"
import "./widgetSm.scss"

import WidgetSmItem from "./WidgetSmItem"
import {useWidgetSmData} from "./use-widgetSm-data"
import {IUser} from "../../types"

const WidgetSm: React.FC = () => {
    const {newUsers} = useWidgetSmData()

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul>
                {newUsers.map((i: IUser) => (
                    <WidgetSmItem key={i._id} {...i}/>
                ))}
            </ul>
        </div>
    );
}

export default WidgetSm