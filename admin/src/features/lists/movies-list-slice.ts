import axios from "axios"
import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import {RootState} from "../../store"

const user = JSON.parse(localStorage.getItem('user') as string)

type MovieListType = {
    [key: string]: string;
}

type TMoviesListsState = {
    status: string;
    error: null | string;
    lists: MovieListType[];
}

interface IUpdateMoviesList {
    _id: string;
    updateMovie: {}
}

export const loadMoviesLists = createAsyncThunk<MovieListType[], undefined, {rejectValue: string}>(
    '@@movies-lists/load-movies-lists',

    async (_, {rejectWithValue}) => {
        return await axios.get(
            '/lists',
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const createMoviesList = createAsyncThunk<MovieListType, {}, {rejectValue: string}>(
    '@@movies-lists/create-movies-list',

    async (item, {rejectWithValue}) => {
        return  await axios.post(
            '/lists',
            item,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const updateMoviesList = createAsyncThunk<MovieListType, IUpdateMoviesList, {rejectValue: string}>(
    '@@movies-lists/update-movies-list',

    async ({_id, updateMovie}, {rejectWithValue}) => {
        return  await axios.put(
            '/lists/' + _id,
            updateMovie,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

export const removeMoviesList = createAsyncThunk<string, string, {rejectValue: string}>(
    '@@movies-lists/remove-movies-list',

    async (id, {rejectWithValue}) => {
        return  await axios.delete(
            '/lists/' + id,
            {
                headers: {
                    authorization: 'Bearer ' + user.accessToken
                }
            }
        )
            .then(() => {
                return id
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

const initialState: TMoviesListsState = {
    status: 'idle', // loading | received | rejected
    error: null,
    lists: [],
}

const moviesListSlice = createSlice({
    name: '@@movies-lists',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(
                loadMoviesLists.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.lists = action.payload!
                }
            )

            .addCase(
                createMoviesList.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.lists = [...state.lists, action.payload]
                }
            )

            .addCase(
                updateMoviesList.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    const out = state.lists.filter(i => i._id !== action.payload._id)
                    out.push(action.payload)
                    state.lists = out
                }
            )

            .addCase(
                removeMoviesList.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.lists = state.lists.filter(i => i._id !== action.payload)
                }
            )

            // .addCase(
            //     loadMoviesLists.pending,
            //     (state) => {
            //         state.status = 'loading'
            //         state.error = null
            //     }
            // )
            //
            // .addCase(
            //     loadMoviesLists.rejected,
            //     (state, action) => {
            //         state.status = 'rejected'
            //         if (typeof action.payload === 'string') state.error = action.payload
            //         // state.error = action.payload || action.meta.error
            //     }
            // )

            .addMatcher(isPending, (state, action: PayloadAction<string>) => {
                state.error = null
                state.status = 'loading'
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    },
})

// export const {setLists, setLoading, setError} = countriesSlice.actions
export const moviesListReducer = moviesListSlice.reducer

//selectors
export const selectMoviesListInfo = (state: RootState) => ({
    status: state.moviesList.status,
    error: state.moviesList.error,
    qty: state.moviesList.lists.length
})

export const selectAllMoviesLists = (state: RootState) => state.moviesList.lists

//helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
    return action.type.endsWith('pending')
}