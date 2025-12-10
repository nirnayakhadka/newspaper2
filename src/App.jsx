import React from 'react'
import {BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import MiniNav from './components/MiniNav.jsx'
import Footer from './components/Footer';
import Mukhya from './pages/Mukhya.jsx';
import News from './pages/News.jsx';
import ArtsCulture from './pages/ArtsCulture.jsx';
import Interview from './pages/Interview.jsx';
import More from './pages/More.jsx';
import Home from './pages/Home.jsx';
function App() {
  return (
    <>
   <Router>
    <div className="min-h-screen flex flex-col">
    <Nav/>
    <MiniNav/>
    <main className="flex-1">
    <Routes>
      
            <Route path="/home" element={<Mukhya/>} />
            <Route path="/news" element={<News/>} />
            <Route path="/artsandculture" element={<ArtsCulture/>} />
            <Route path="/interview" element={<Interview/>} />
        
            <Route path="/more" element={<More />} />
            <Route path="/" element={<Home/>} />
          </Routes>
          </main>
  
     <Footer/>
     </div>
     </Router>
    </>

  )
}

export default App
