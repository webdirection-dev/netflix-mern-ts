import axios from "axios"

import {loginFailure, loginStart, loginSuccess} from "./AuthActions"

import {TAuthDispatch} from "../../static-data/types/autchTypes"

interface ILoginCall {email: string, password: string}

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

        if (dispatch) dispatch(loginSuccess(res.data))
    } catch (err) {
        if (dispatch) dispatch(loginFailure())
        console.error(err)
    }
}