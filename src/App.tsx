import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import View from './pages/View/View';
import NotFound from './pages/Errors/404/404';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
