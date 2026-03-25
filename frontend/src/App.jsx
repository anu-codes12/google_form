import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FormBuilder from './pages/FormBuilder';
import FormViewer from './pages/FormViewer';
import ResponsesDashboard from './pages/ResponsesDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/edit/:id" element={<FormBuilder />} />
            <Route path="/form/:id" element={<FormViewer />} />
            <Route path="/responses/:formId" element={<ResponsesDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
