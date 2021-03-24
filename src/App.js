import './App.css';
import ToDoList from './component/todo';
import React from 'react';
import { Provider } from 'react-redux';
import {store} from './redux/store';
function App() {

  return (
    <Provider store={store}>
    <div className="App">
    <ToDoList/>
    </div>
    </Provider>
  );
}

export default App;
