import axios from "axios"

import {loginFailure, loginStart, loginSuccess} from "./authContext/AuthActions"
import {
    getMoviesStart,
    getMoviesSuccess,
    getMoviesFailure,

    createMovieStart,
    createMovieSuccess,
    createMovieFailure,

    deleteMovieStart,
    deleteMoviesSuccess,
    deleteMoviesFailure,
} from "./movieContext/MovieActions"
import {
    getListsStart,
    getListsSuccess,
    getListsFailure,

    createListStart,
    createListSuccess,
    createListFailure,

    deleteListStart,
    deleteListSuccess,
    deleteListFailure, updateListStart, updateListSuccess, updateListFailure,
} from "./listsContext/ListsActions"

import {TAuthDispatch, TMovieDispatch} from "../types/apiTypes"

interface ILoginCall {email: string, password: string}

//login
export const loginCall = async (user: ILoginCall, dispatch: TAuthDispatch) => {
    if (dispatch) dispatch(loginStart())

    try {
        const res = await axios.post(
            '/auth/login',
            {
                email: user.email,
                password: user.password,
            }
        )

        if (dispatch && res.data.isAdmin) dispatch(loginSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(loginFailure())
        console.error(err)
    }
}


//get movies
export const getMovies = async (dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(getMoviesStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        const res = await axios.get(
            '/movies',
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(getMoviesSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(getMoviesFailure())
        console.error(err)
    }
}

//create movies
export const createMovies = async (item: {}, dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(createMovieStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        const res = await axios.post(
            '/movies',
            item,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(createMovieSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(createMovieFailure())
        console.error(err)
    }
}

//delete movie
export const deleteMovie = async (id: string, dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(deleteMovieStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        await axios.delete(
            '/movies/'+id,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(deleteMoviesSuccess(id))
    } catch (err) {
        if (dispatch) dispatch(deleteMoviesFailure())
        console.error(err)
    }
}


//get lists
export const getLists = async (dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(getListsStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        const res = await axios.get(
            '/lists',
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(getListsSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(getListsFailure())
        console.error(err)
    }
}

//create lists
export const createList = async (item: {}, dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(createListStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        const res = await axios.post(
            '/lists',
            item,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(createListSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(createListFailure())
        console.error(err)
    }
}

//update lists
export const updateList = async (id: string, item: {}, dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(updateListStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        const res = await axios.put(
            '/lists/'+id,
            item,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(updateListSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(updateListFailure())
        console.error(err)
    }
}

//delete lists
export const deleteList = async (id: string, dispatch: TMovieDispatch) => {
    if (dispatch) dispatch(deleteListStart())

    const user = JSON.parse(localStorage.getItem('user') as string)

    try {
        await axios.delete(
            '/lists/'+id,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )

        if (dispatch) dispatch(deleteListSuccess(id))
    } catch (err) {
        if (dispatch) dispatch(deleteListFailure())
        console.error(err)
    }
}