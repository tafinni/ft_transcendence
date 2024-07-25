import React from 'react';

import './App.css';

import Navigation from './components/Navigation';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Stats from './routes/Stats';
import Profile from './routes/Profile';
import Home from './routes/Home';

 
function App() {

  return (
    <div className="App">

      <Navigation> </Navigation>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

  );
}

export default App;
