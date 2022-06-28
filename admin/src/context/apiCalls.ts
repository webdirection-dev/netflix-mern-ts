import axios from "axios"

import {loginFailure, loginStart, loginSuccess} from "./authContext/AuthActions"
import {getMoviesStart, getMoviesSuccess, getMoviesFailure} from "./movieContext/MovieActions"

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