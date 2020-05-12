import React, { useReducer } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Container from '@material-ui/core/Container';
import Topic from './components/Topic/Topic';
import Content from './components/Content/Content';
import AppContext from './contexts/AppContext';
import reducer from './reducers';



const App = () => {

  const initialState = {
    words: [],
    genre: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Header></Header>
        <Container maxWidth="lg">
          <Topic></Topic>
          <Content></Content>
        </Container>
      </div>
    </AppContext.Provider>
  );
}

export default App;
