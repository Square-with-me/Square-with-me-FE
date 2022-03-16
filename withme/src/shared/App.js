import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import styled from 'styled-components';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Kakao from '../components/Header/Kakao';
import Test from '../pages/Test';
import Landing from '../pages/Landing';

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/room/:id" exact component={Detail} />
        <Route path="/api/auth/kakao/callback" element={<Kakao />} />
        <Route path="/mypage/:id" exact component={MyPage} />
        <Route path="/test" exact component={Test} />
        <Route path="/land" exact component={Landing}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}
const Back = styled.div`
z-index: -10;
width: 100%;
height: 100%;
position: absolute;
top: 530px;
background-color: #F7F7F7;
`
export default App;
