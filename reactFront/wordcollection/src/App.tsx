import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import './App.css';
import Header from './components/Header/Header';
import Container from '@material-ui/core/Container';
import Topic from './components/Topic/Topic';
import Content from './components/Content/Content';
import Home from './components/Home/Home';
import AppContext from './contexts/AppContext';
import reducer from './reducers';


const App = () => {

  const initialState = {
    words: [],
    currentGenre: ['ALL'],
    searchWord: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Switch>
        <Route exact path="/mypage">
          <AppContext.Provider value={{ state, dispatch }}>
            <div className="App">
              <Header></Header>
              <Container maxWidth="lg">
                <Topic></Topic>
                <Content></Content>
              </Container>
            </div>
          </AppContext.Provider>
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
