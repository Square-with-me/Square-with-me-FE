import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import './App.css';

function App() {
  return (
    <React.Fragment>
      {/* <Grid> */}
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        {/* <Route path="/detail/:id" exact component={Detail}/> */}
        <Route path="/mypage/:id" exact component={MyPage} />
      </ConnectedRouter>
      {/* </Grid> */}
    </React.Fragment>
  );
}

export default App;
