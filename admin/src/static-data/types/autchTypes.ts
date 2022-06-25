import {Dispatch} from "react"

export interface IAuthUserAction {
    type: string;
    payload?: {};
}

export type TAuthDispatch = Dispatch<IAuthUserAction> | undefined

export interface IAuthUserState {
    user: null | {};
    isFetching: boolean;
    error: boolean;
    dispatch?: TAuthDispatch;
}
