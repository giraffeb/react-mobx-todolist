import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import DevTools from 'mobx-react-devtools';

function App() {

  return (
    <div className="App">
      <TodoList ></TodoList>
      <DevTools></DevTools>
    </div>
  );
}

export default App;
