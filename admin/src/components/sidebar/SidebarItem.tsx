import React from "react"
import {Link} from 'react-router-dom'

import {titleSidebarItem, ISidebarItem} from "../../static-data/sidebar-data"

const SidebarItem: React.FC<ISidebarItem> = (props) => {
    const {title, icon, link, index, pathname} = props

    const active = link.split('/')[1] === pathname.split('/')[1] ? 'active' : ''

    return(
        <>
            {index === 0 ? titleSidebarItem[0] : null}
            {index === 1 ? titleSidebarItem[1] : null}
            {index === 5 ? titleSidebarItem[2] : null}
            {index === 7 ? titleSidebarItem[3] : null}
            {index === 10 ? titleSidebarItem[4] : null}

            <Link to={link} className={active}>
                <li>
                    {icon}
                    <span>{title}</span>
                </li>
            </Link>
        </>
    )
}

export default SidebarItem