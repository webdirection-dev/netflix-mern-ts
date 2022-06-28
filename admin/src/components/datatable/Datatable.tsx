import React, {useContext, useEffect} from "react"
import {Link} from 'react-router-dom'
import './datatable.scss'

import {DataGrid} from '@mui/x-data-grid'
import {useGetDataForDatatable} from "./use-get-data-for-datatable"
import {MovieContext} from "../../context/movieContext/MovieContext";
import {moviesColumns} from "../../static-data/data/datatable-data";
import {getMovies} from "../../context/apiCalls";

interface IDatatableProps {
    type: string
}


const Datatable: React.FC<IDatatableProps> = ({type}) => {
    const {columns, rows, title} = useGetDataForDatatable(type)

    const handleDelete = (id: number) => {
        // setData(data.filter(i => i.id !== id))
    }

    const actionColumn= [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params: {row: {id: number}}) => {
                return (
                    <div className="cellAction">
                        <Link to='/users/test' style={{textDecoration: 'none'}}>
                            <div className="viewButton">View</div>
                        </Link>

                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                );
            },
        }
    ]


    return(
        <>
            <div className="datatableTitle">
                {title}
                <Link to='/users/new' className='link'>Add New</Link>
            </div>

            <div className="datatable">
                <DataGrid
                    className='datagrid'
                    rows={rows}
                    columns={columns.concat(actionColumn)}
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