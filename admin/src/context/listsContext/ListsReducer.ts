import {IListAction, IListState} from "../../types/apiTypes"

const ListsReducer = (state: IListState, action: IListAction) => {
    switch (action.type) {
        case 'GET_LISTS_START': {
            return {
                lists: [],
                isFetching: true,
                error: false,
            }
        }

        case 'GET_LISTS_SUCCESS': {
            return {
                lists: action.payload,
                isFetching: false,
                error: false,
            }
        }

        case 'GET_LISTS_FAILURE': {
            return {
                lists: [],
                isFetching: false,
                error: true,
            }
        }

        case 'CREATE_LIST_START': {
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        }

        case 'CREATE_LIST_SUCCESS': {
            return {
                lists: [...state.lists, action.payload],
                isFetching: false,
                error: false,
            }
        }

        case 'CREATE_LIST_FAILURE': {
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        }

        case 'UPDATE_LIST_START': {
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        }

        case 'UPDATE_LIST_SUCCESS': {
            return {
                lists: state.lists.map(i => i._id === action.payload),
                // movies: state.movies.map(i => i._id === action.payload && action.payload._id),
                isFetching: false,
                error: false,
            }
        }

        case 'UPDATE_LIST_FAILURE': {
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        }

        case 'DELETE_LIST_START': {
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        }

        case 'DELETE_LIST_SUCCESS': {
            return {
                lists: state.lists.filter(i => i._id !== action.payload),
                isFetching: false,
                error: false,
            }
        }

        case 'DELETE_LIST_FAILURE': {
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        }

        default: return {...state}
    }
}

export default ListsReducer