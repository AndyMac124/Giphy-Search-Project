import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import Results from './pages/Results/Results'
import View from './pages/View/View'
import NotFound from './pages/Errors/404/404'
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
      </header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/results" element={<Results/>} />
        <Route path="/view" element={<View/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <footer>
      </footer>
    </div>
  );
}

export default App;
