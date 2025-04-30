import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Navigation from './components/Navigation';



function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/today-list" element={<Today />} />
        <Route path="/upcoming" element={<Upcoming />} />
      </Routes>
    </>
  );
}

export default App;