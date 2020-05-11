import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Container from '@material-ui/core/Container';
import Card from './components/Card/Card';
import Topic from './components/Topic/Topic';

const App = () => {
  return (
    // mainpage
    <div className="App">
      <Header></Header>
      <Container maxWidth="lg">
        <Topic></Topic>
        <Card></Card>
      </Container>
    </div>
  );
}

export default App;
