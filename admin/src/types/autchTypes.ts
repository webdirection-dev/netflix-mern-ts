import {Dispatch} from "react"
import {IUser} from "./types"

export interface IAuthUserAction {
    type: string;
    payload?: {};
}

export type TAuthDispatch = Dispatch<IAuthUserAction> | undefined

export interface IAuthUserState {
    user: null | IUser;
    isFetching: boolean;
    error: boolean;
    dispatch?: TAuthDispatch;
}
