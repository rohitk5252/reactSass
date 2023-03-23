import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
})

const initialStateValue = {
    data: [],
    status: STATUSES.IDLE
}

const newsSlice = createSlice({
    name: 'news',
    initialState: initialStateValue,
    reducers: {
        // reducers goes here
    }, 
    //  A "builder callback" function used to add more reducers, 

    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state, action) => {
            state.status = STATUSES.LOADING
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.status = STATUSES.IDLE
            state.data = action.payload
        })
        .addCase(fetchNews.rejected, (state, action) => {
            state.status = STATUSES.ERROR
        })
    }
})



export default newsSlice.reducer




// THUNKS - a piece of code that does some delayed work ( e.g api calls ect)


// NEW Way of writing thunk
// -----------------------
// ------------------------------------------  identifier below
export const fetchNews = createAsyncThunk('news/fetch', async(arr)=> { 
    console.log("newsApi",  arr[0])
    const res = await fetch(arr[0], {
        headers: {
          'Authorization': `Bearer ${arr[1]}`
        }
      })
    const data = await res.json()
    return data
})




// OLD Way of writing thunk ( in this we dont have to use ExtraReducers and define all the dipatch ourseves [ eg taken from other app ])
// -----------------------
//  this fn return a  THUNK
// this is an action/THUNK and can be dispatched using dispatch()
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         // getState()​ Returns the current state tree of your application.
//         //  It is equal to the last value returned by the store's reducer
//         // const property = getState().data 
//         try {
//             const res = await fetch('http://fakestoreapi.com/products');
//             const data = await res.json()
            
//             if(res.ok) {
//                 console.log(data)
//                 dispatch(setProducts(data))
//                 dispatch(setStatus(STATUSES.IDLE))
//             }
//         } catch  (err) {
//             console.log(err)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }