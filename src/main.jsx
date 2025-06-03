import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/games" element={<Home />} />
        <Route path="*" element={<div className="text-center text-white">Página no encontrada</div>} />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
