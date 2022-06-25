import {createContext, useReducer, PropsWithChildren, ReducerWithoutAction} from "react"
import AuthReducer from "./AuthReducer"
import {IAuthUserState} from "../../static-data/types/autchTypes";

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext<IAuthUserState>(INITIAL_STATE)

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(
        AuthReducer as ReducerWithoutAction<IAuthUserState>,
        INITIAL_STATE
    )

    const value = {
        ...state,
        dispatch
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}