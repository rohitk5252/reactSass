import { createSlice } from "@reduxjs/toolkit";


const initialStateValue = { username: "", token: ""}

const userSlice = createSlice(({
    name : 'user',
    initialState: initialStateValue,
    reducers : {
        login: (state, action) => {
            return action.payload
            
            // can be also done by themethod below
            //  because toolkit provides supports this 
            // and under the hood does the same as done in above statemenr


            // state = action.payload
        },
        logout: (state, action) => {
            return initialStateValue
        }
    }
}))


export const { login, logout } = userSlice.actions
export default userSlice.reducer
