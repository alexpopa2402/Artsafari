import {Route, Routes, } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import GalleryPage from './Pages/Gallery/GalleryPage';
import AboutPage from './Pages/About/AboutPage';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import UserPage from './Pages/Users/UserPage';
import './App.css';





const App = () => {
  return (
      <div className='grandContainer'>
        <Header />
        <div className='main-container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
