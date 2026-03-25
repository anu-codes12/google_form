import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FormBuilder from './pages/FormBuilder';
import FormViewer from './pages/FormViewer';
import ResponsesDashboard from './pages/ResponsesDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/edit/:id" element={<FormBuilder />} />
            <Route path="/form/:id" element={<FormViewer />} />
            <Route path="/responses/:formId" element={<ResponsesDashboard />} />
          </Routes>
        </main>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
