import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Container from '@material-ui/core/Container';
import Topic from './components/Topic/Topic';
import Content from './components/Content/Content';



const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Container maxWidth="lg">
        <Topic></Topic>
        <Content></Content>
      </Container>
    </div>
  );
}

export default App;
