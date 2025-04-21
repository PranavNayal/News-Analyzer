import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ArticlesProvider } from './context/ArticlesContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import ResultPage from './pages/ResultPage';
import History from './pages/History';
import About from './pages/About';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ArticlesProvider>
        <Router>
          <div className="app-container">
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analyze" element={<Analyze />} />
                <Route path="/results/:articleId" element={<ResultPage />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ArticlesProvider>
    </ThemeProvider>
  );
}

export default App;