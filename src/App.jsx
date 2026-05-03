import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PodcastLibrary from './pages/PodcastLibrary';
import EpisodeDetail from './pages/EpisodeDetail';
import BookSession from './pages/BookSession';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="podcasts" element={<PodcastLibrary />} />
          <Route path="episode/:slug" element={<EpisodeDetail />} />
          <Route path="book" element={<BookSession />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
