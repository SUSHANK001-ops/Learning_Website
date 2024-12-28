import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import User from './components/User';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  const location = useLocation();
  
  // Determine which routes should not show Hero and About
  const hideHeroRoutes = ['/hero', '/user', '/signup', '/login'];
  const hideAboutRoutes = ['/user', '/signup', '/login'];
  
  const shouldShowHero = !hideHeroRoutes.includes(location.pathname);
  const shouldShowAbout = !hideAboutRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {shouldShowHero && <Hero />}
      {shouldShowAbout && <About />}
    </>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;