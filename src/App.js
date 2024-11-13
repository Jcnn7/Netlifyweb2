import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CustomizeCD from './pages/CustomizeCD'; // Ensure this file exists
import Header from './components/Header'; 
import Cards from './pages/Cards'; // Ensure this file exists
import Preview from './pages/Preview';
import SpotifyAPI from './components/SpotifyAPI';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cd" element={<CustomizeCD />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
      <Cards/>
   </Router>
  );
}

// Create a root and render the app using createRoot (React 18)
const root = ReactDOM.createRoot(document.getElementById('root')); // Make sure the element ID is 'root'
root.render(<App />);

export default App;
