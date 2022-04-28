import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from './components/HelloWorld';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import './App.css'
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
