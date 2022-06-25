import {IAuthUserAction, IAuthUserState} from "../../static-data/types/autchTypes"

const AuthReducer = (state: IAuthUserState, action: IAuthUserAction) => {
    switch (action.type) {
        case 'LOGIN_START': {
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        }

        case 'LOGIN_SUCCESS': {
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        }

        case 'LOGIN_FAILURE': {
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        }

        default: return {...state}
    }
}

export default AuthReducer