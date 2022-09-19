import { createSlice, createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

const LOG_IN = 'user/logIn';
const LOG_OUT = 'user/logOut';

const initialState: any = {
  user: null,
}

export const logInAction = createAction<any>(LOG_IN);
export const logOutAction = createAction(LOG_OUT);

const UserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logInAction, (state, action) => {
      const user = {
        id: action.payload.id,
        pwd: action.payload.pwd,
      }
      state.user = user;
    })
    .addCase(logOutAction, (state, action) => {
      state.user = null;
    })
})

// const UserReducer = createSlice({
//   name: 'UserReducer',
//   initialState: initialState,
//   reducers: {
//     [LOG_IN]: (state, action: PayloadAction<any>) => {
//       console.log('reducers:', action.payload)
//       state.user = action.payload.user;
//     },
//   }
// });

export default UserReducer;