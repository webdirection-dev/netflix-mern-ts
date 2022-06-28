import {createContext, useReducer, PropsWithChildren, ReducerWithoutAction} from "react"
import MovieReducer from "./MovieReducer"
import {IMovieState} from "../../types/apiTypes"

const INITIAL_STATE = {
    movies: [],
    isFetching: false,
    error: false,
}

export const MovieContext = createContext<IMovieState>(INITIAL_STATE)

export const MovieContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(
        MovieReducer as ReducerWithoutAction<IMovieState>,
        INITIAL_STATE,
    )

    const value = {
        ...state,
        dispatch,
    }

    return(
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}