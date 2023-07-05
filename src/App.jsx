import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AddPage from './pages/AddPage';
import Navigation from './components/Navigation';
import HomePageWrapper from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="app-container">
      <header>
      <h1><Link to="/" style={{textDecoration: 'none'}}>Personal Notes Apps</Link></h1>
      <Navigation />
      </header>
      <main>
      <Routes>
          <Route path="/" element={<HomePageWrapper />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
