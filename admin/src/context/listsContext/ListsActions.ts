import {IMovie} from "../../types/types"

//GET
export const getListsStart = () => ({
    type: 'GET_LISTS_START',
})

export const getListsSuccess = (lists: IMovie[]) => ({
    type: 'GET_LISTS_SUCCESS',
    payload: lists,
})

export const getListsFailure = () => ({
    type: 'GET_LISTS_FAILURE',
})


//CREATE LIST
export const createListStart = () => ({
    type: 'CREATE_LIST_START'
})

export const createListSuccess = (item: {}) => ({
    type: 'CREATE_LIST_SUCCESS',
    payload: item,
})

export const createListFailure = () => ({
    type: 'CREATE_LIST_FAILURE',
})


//UPDATE LIST
export const updateListStart = () => ({
    type: 'UPDATE_LIST_START'
})

export const updateListSuccess = (item: {}) => ({
    type: 'UPDATE_LIST_SUCCESS',
    payload: item,
})

export const updateListFailure = () => ({
    type: 'UPDATE_LIST_FAILURE',
})


//DELETE
export const deleteListStart = () => ({
    type: 'DELETE_LIST_START'
})

export const deleteListSuccess = (id: string) => ({
    type: 'DELETE_LIST_SUCCESS',
    payload: id,
})

export const deleteListFailure = () => ({
    type: 'DELETE_LIST_FAILURE',
})