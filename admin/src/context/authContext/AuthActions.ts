import {IUser} from "../../static-data/types/types"

export const loginStart = () => ({
    type: 'LOGIN_START',
})

export const loginSuccess = (user: IUser) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
})

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
})