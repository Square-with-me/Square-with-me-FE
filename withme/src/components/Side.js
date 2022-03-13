import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

//page
import LoginModal from "../pages/LoginModal";
import SignupModal from "../pages/SignupModal";

//svg
import { ReactComponent as UserNickIcon } from "../assets/modals/userNickIcon.svg";
import { ReactComponent as ExitIcon } from "../assets/inRoom/exitIcon.svg";
import { AiOutlineClose } from "react-icons/ai";

const Side = ({setSide,onSetSide})=>{
  
  const dispatch = useDispatch()

  const [LoginM, setLoinM] = useState(false);
  const onsetLoinM =(active)=>{
    setLoinM(active)
  }

  const [SignupM, setSignup] =useState(false);
  const onsetSignup =(active)=>{
    setSignup(active)
  }

  const [isActive, setIsActive] = useState(false);
  const onSetIsVisible =(active)=>{
    setIsActive(active)
  }

  //login 
  useEffect(() => {
    console.log('로그인 췤');
    dispatch(userActions.logInCheckDB());
  }, []);

  const user = useSelector((state) => state.user.user);

  const is_login = useSelector((state) => state.user.is_login);
  const is_local = localStorage.getItem("is_login")?true:false;
  React.useEffect(()=>{ },[is_login])

  const notUser_is_login = useSelector((state) => state.user.notUser_is_login);
  const notUser_is_local = localStorage.getItem('notUser_is_login')?true:false;
  React.useEffect(()=>{ },[notUser_is_login])

return(
  <React.Fragment>
    <ModalBackground
      onClick={() => {
        setSide(false)
      }}
    />
    <Wrap>
        <AiOutlineClose
          style={{ cursor: "pointer", marginBottom:"16px", right:"0", width:"32px", position:"absolute"}}
          onClick={() => {
            setSide(false)
          }}
        />
        <div style={{display:"flex", padding:"8px"}}>
          <UserNickIcon fill="#000000" width="32px" height="32px" style={{marginRight:"8px"}}/>
          {is_local === true && notUser_is_local
          ?<Text                 
          onClick={() => {
            history.push(`/mypage/${user.id}`);
            onSetSide(false)
          }}>마이페이지</Text>
          :<Text onClick={()=>{onsetLoinM(true)}}>로그인</Text>}

          {notUser_is_local ===true
          ?<Text onClick={() => {
            dispatch(userActions.notUserLogOut());
          }}>비회원은<br/> 그만할래요</Text>
          :null}
        </div>
        {LoginM && <LoginModal setLoinM={setLoinM} setSignup={setSignup}/>}
        {SignupM && <SignupModal setSignup={setSignup} />}

      
      <div style={{display:"flex", padding:"8px"}}>
        <ExitIcon fill="#000000" width="32px" height="32px" style={{marginRight:"8px"}}/>
        <Text>나가기</Text>
      </div>


    </Wrap>
  </React.Fragment>
)
}
// sidebar뒷배경
const ModalBackground = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 40;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
`
const Wrap =styled.div`
  z-index: 100;
  background-color: #F7F7F7;
  width: 100%;
  height: 176px;
  padding: 16px;
`
const Text = styled.div`
font-size: 32px;
color: #000000;
cursor: pointer;
`

export default Side;