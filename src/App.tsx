import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ShowList from './components/ShowList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<h1>Expense Tracker add Module</h1>}/>
          <Route path="/" element={<ShowList/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
