import {createContext, useReducer, PropsWithChildren, ReducerWithoutAction} from "react"
import ListsReducer from "./ListsReducer"
import {IListState} from "../../types/apiTypes"

const INITIAL_STATE = {
    lists: [],
    isFetching: false,
    error: false,
}

export const ListsContext = createContext<IListState>(INITIAL_STATE)

export const ListsContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(
        ListsReducer as ReducerWithoutAction<IListState>,
        INITIAL_STATE,
    )

    const value = {
        ...state,
        dispatch,
    }

    return(
        <ListsContext.Provider value={value}>
            {children}
        </ListsContext.Provider>
    )
}