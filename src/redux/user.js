import { createSlice } from '@reduxjs/toolkit';

export const UserAuth = createSlice ({
    name: 'User',
    initialState: {
        Token : null ,
        Role : null ,
        DisplayName : null ,
        Email :null,
        Id:null,
        Verified:null,
        AccessKey:null
    },
    reducers : {
        userLogin ( state , action){
            state.Token = action.payload.token ,
            state.AccessKey = action.payload.access ,
            state.Role = action.payload.role ,
            state.Verified = action.payload.verified ,
            state.DisplayName = action.payload.username ,
            state.Email = action.payload.email ,
            state.Id = action.payload.id 
        },
        userLogout ( state){
            state.Token = null ,
            state.AccessKey = null ,
            state.Role = null ,
            state.Verified = null ,
            state.DisplayName = null ,
            state.Email = null ,
            state.Id = null 
        },
        updateVerification (state,action){
            state.Verified = action.payload.verified 
        },
    }
})

export const {userLogin , userLogout , updateVerification } = UserAuth.actions ;

export const UserReducer = UserAuth.reducer ;