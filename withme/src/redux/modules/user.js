import {createAction, handleActions } from "redux-actions";
import {produce} from "immer"
import axios from "axios"

const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'

const setUser = createAction(SET_USER,(user)=>({user}))
const logOut = createAction(LOG_OUT, (user)=>({user}))

const initialState ={
    user: null,
    is_login: false
}

//로그인 미들웨어
const logInDB =()=>{

}

//로그아웃 미들웨어
const logOutDB =()=>{

}

//회원가입 미들웨어
const signUpDB =()=>{

}

//로그인 체크 미들웨어
const logInCheckDB =()=>{

}

//비회원 로그인 
const NotMenberloginDB =()=>{

}

//비회원 로그아웃 
const NotMenberlogoutDB =()=>{

}


//리덕스
export default handleActions(
    {
        [SET_USER] :(state, action) =>produce(state,(draft)=>{
            draft.user = action.payload.user
            draft.is_login =true
        }),
        [LOG_OUT] :(state, action) => produce(state, (draft)=>{
            draft.is_login = false
            draft.user = null
        })
    }, initialState
)

const actionCreators ={
    setUser,
    logOut,
    logInDB,
    logOutDB,
    logInCheckDB,
    signUpDB
}

export {actionCreators}