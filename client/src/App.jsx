import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar/Navbar';
import LeadForm from './features/leads/LeadForm';
import LeadsList from './features/leads/LeadsList';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <div className="app-container">
                    <Navbar />
                    <main className="container" style={{ marginTop: '2rem' }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/leads/new" replace />} />
                            <Route path="/leads" element={<LeadsList />} />
                            <Route path="/leads/new" element={<LeadForm />} />
                        </Routes>
                    </main>
                </div>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
