import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './components/News';
import TopHeadlines from './components/TopHeadlines';
import CategoryNav from './components/CategoryNav';

export function App() {
  return (
    <>
      <div className='w-full'>
        <BrowserRouter>
          <Header />
          <CategoryNav />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
