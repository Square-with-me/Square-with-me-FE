import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import LoginModal from '../pages/LoginModal';
import SignupModal from '../pages/SignupModal';
import Header from '../components/Header';
import Kakao from '../components/Kakao';

import Test from '../pages/Test';

import './App.css';
<<<<<<< HEAD
import TimerTest from '../pages/TimerTest';
=======
import TimerTest from '../pages/TestTimer';
>>>>>>> 20ffc00379da1f79f74639e87b7d78814117e93c

function App() {
  return (
    <>
      {/* <Grid> */}
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/room/:id" exact component={Detail} />
        <Route path="/login" exact component={LoginModal}></Route>
        <Route path="/signup" exact component={SignupModal}></Route>
        <Route path="/api/auth/kakao/callback" element={<Kakao />} />
        <Route path="/mypage/:id" exact component={MyPage} />
        <Route path="/test" exact component={Test} />
<<<<<<< HEAD
        <Route path="/timertest" exact component={TimerTest} />
=======
        <Route path="/test2" exact component={TimerTest} />
>>>>>>> 20ffc00379da1f79f74639e87b7d78814117e93c
      </ConnectedRouter>
      {/* </Grid> */}
    </>
  );
}

export default App;
