import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import SearchHistory from './components/SearchHistory';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <nav className="bg-white bg-opacity-10 py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Story Explorer</h1>
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${isActive ? 'bg-purple-500 text-white' : 'hover:bg-purple-400'}`
                }
              >
                Search Stories
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `ml-4 px-4 py-2 rounded-md ${isActive ? 'bg-purple-500 text-white' : 'hover:bg-purple-400'}`
                }
              >
                Search History
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<SearchForm />} />
            <Route path="/history" element={<SearchHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
