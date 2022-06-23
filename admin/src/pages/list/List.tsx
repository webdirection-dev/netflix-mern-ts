import React from "react"
import './list.scss'

import Datatable from "../../components/datatable/Datatable"

const List: React.FC = () => {

    return(
        <div className='list'>
            <Datatable />
        </div>
    )
}

export default List