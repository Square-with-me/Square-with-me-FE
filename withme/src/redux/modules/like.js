import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import axios from "axios";

const IS_LIKE = "IS_LIKE"

const isLike = createAction(IS_LIKE, (is_like) => ({is_like}));

const initialState = {
    list: [],
    is_like: false
};

const likeDB =()=>{

}

const unLikeDB =()=>{

}

export default handleActions(
    {
        [IS_LIKE]:(state, action)=>produce(state,(draft)=>{

        })
    },initialState
)

const actionCreators = {
    isLike,

    likeDB,
    unLikeDB
}

export {actionCreators};