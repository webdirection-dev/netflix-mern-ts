import {Dispatch} from "react"
import {IUser, IMovie} from "./types"

//auth
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

//movie
export interface IMovieAction {
    type: string;
    payload?: {};
}

export type TMovieDispatch = Dispatch<IMovieAction> | undefined

export interface IMovieState {
    movies: IMovie[];
    isFetching: boolean;
    error: boolean;
    dispatch?: TMovieDispatch;
}
