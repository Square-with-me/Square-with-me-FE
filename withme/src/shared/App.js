import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Kakao from '../components/Kakao';
import Test from '../pages/Test';
import TimerTest from '../pages/TimerTest';

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/room/:id" exact component={Detail} />
        <Route path="/api/auth/kakao/callback" element={<Kakao />} />
        <Route path="/mypage/:id" exact component={MyPage} />
        <Route path="/test" exact component={Test} />
        <Route path="/test2" exact component={TimerTest} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
