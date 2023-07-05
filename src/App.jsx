import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';

function App() {
  return (
    <div className="app-container">
      <header>
      <h1><Link to="/">Personal Notes Apps</Link></h1>
      </header>
      <main>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/new" element={<AddPage />} />
      </Routes>
      </main>
    </div>
  );
}

export default App;
