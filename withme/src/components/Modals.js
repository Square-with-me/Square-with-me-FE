import React, { useState } from 'react';
import LoginModal from "../pages/LoginModal";
import SignupModal from "../pages/SignupModal";
import MakeRoomModal from "../pages/MakeRoomModal";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const Modals = () => {
  const dispatch = useDispatch();

  const [LoginM, setIsM] = useState(false);
  const [SignupM, setIsSignup] = useState(false);
  const [MRooms, setMRooms] = useState(false);

  return (
    <>
    {LoginM && <LoginModal setIsM={setIsM} setIsSignup={setIsSignup}/>}
    {SignupM && <SignupModal setIsSignup={setIsSignup} />}
    {MRooms && <MakeRoomModal setMRooms={setMRooms} />}
    </>
  );
};

export default Modals;