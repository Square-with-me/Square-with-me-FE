import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import Detail from "../pages/Detail";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import Kakao from "../pages/Kakao";
import Landing from "../pages/Landing";
import Admin from "../pages/Admin"
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("login-token")) {
      dispatch(userActions.logInCheckDB());
    } else if (!localStorage.getItem("login-token")) {
      return;
    }
  }, []);
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Landing} />
        <Route path="/main" exact component={Main} />
        <Route path="/room/:id" exact component={Detail} />
        <Route path="/api/auth/kakao/callback" exact component={Kakao} />
        <Route path="/mypage/:id" exact component={MyPage} />
        <Route path="/nemo/with/me/admin" exact component={Admin} />
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;
