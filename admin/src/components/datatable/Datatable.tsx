import React, {useState} from "react"
import {Link} from 'react-router-dom'
import './datatable.scss'

import {userColumns, userRows} from "../../static-data/data/datatable-data"
import {DataGrid} from '@mui/x-data-grid'

import {useGetDataForDatatable} from "./use-get-data-for-datatable"

interface IDatatableProps {
    type: string
}

const Datatable: React.FC<IDatatableProps> = ({type}) => {
    const {columns, rows, title, deleteItem} = useGetDataForDatatable(type)
    const [data, setData] = useState(userRows) // заглушка для юзеров

    const handleDelete = (id: string) => {
        if (type === 'user') setData(data.filter(i => i._id !== id))
        else deleteItem(id)
    }

    const actionColumn= [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: {row: {_id: string}}) => {
                return (
                    <div className="cellAction">
                        <Link
                            style={{textDecoration: 'none'}}
                            to={`/${type+'s'}/`+params.row._id}
                            state={{ props: params.row }}
                        >
                            <div className="viewButton">View</div>
                        </Link>

                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                );
            },
        }
    ]

    return(
        <>
            <div className="datatableTitle">
                Add New {title}
                <Link to={`/${title.toLowerCase()}s/new`} className='link'>Add New</Link>
            </div>

            <div className="datatable">
                <DataGrid
                    className='datagrid'
                    rows={type === 'user' ? data : rows}
                    columns={type === 'user' ? userColumns.concat(actionColumn) : columns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    getRowId={row => row._id}
                />
            </div>
        </>
    )
}

export default Datatable