import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './components/Category';
import Game from './components/Game';
import Herosec from './components/Herosec';
import Result from './components/Result';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Herosec />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Game/:category" element={<Game />} />
      <Route path="/Result" element={<Result/>} />
    </Routes>
  );
}

export default App;
