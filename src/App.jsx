import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import GalleryPage from './Pages/Gallery/GalleryPage';
import AboutPage from './Pages/About/AboutPage';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header/Header';
import './App.css';


function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
