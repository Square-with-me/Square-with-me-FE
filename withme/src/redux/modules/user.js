import {createAction, handleActions } from "redux-actions";
import {produce} from "immer"
import axios from "axios"

const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const NOT_USER ='NOT_USER'
const NOT_USER_LOG_OUT ='NOT_USER_LOG_OUT'

const setUser = createAction(SET_USER,(user)=>({user}))
const logOut = createAction(LOG_OUT, (user)=>({user}))
const notUser = createAction(NOT_USER, (user)=>({user}))
const notUserLogOut = createAction(NOT_USER_LOG_OUT, (user)=>({user}))

const initialState ={
    user: null,
    is_login: false,
    notUser_is_login:false,
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
 return(function(getState, dispatch, {history}){
     axios.get('/api/user/anon')
     .then((response)=>{
         let token = response.data.token
         localStorage.setItem("is_login", token)
         dispatch(notUser({
            user_id : response.data.user.id,
            nick : response.data.user.nickname,
            statusMsg : response.data.user.statusMsg,
            token : response.data.token
         }))
     })
     .catch((error)=>{
         console.log(error)
     })
 })
}

//비회원 로그아웃 
const NotMenberlogOutDB =()=>{
    return function(getState, dispatch, {history}){
        dispatch(notUserLogOut())
    }
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
        }),
        [NOT_USER]:(state, action)=>produce(state,(draft)=>{
            draft.notUser = action.payload.user
            draft.notUser_is_login = true
        }),
        [NOT_USER_LOG_OUT] :(state, action)=>produce(state,(draft)=>{
            localStorage.clear()
            draft.notUser=null
            draft.notUser_is_login =false
        })
    }, initialState
)

const actionCreators ={
    setUser,
    logOut,
    logInDB,
    logOutDB,
    logInCheckDB,
    signUpDB,
    NotMenberloginDB,
    NotMenberlogOutDB
}

export {actionCreators}