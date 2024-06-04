import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapWrapper from '../components/MapWrapper';
import Login from '../components/Login';
import ProtectedUserRoutes from '../helper/protectiveUserRoutes';
import Signup from '../components/Signup';
import Otp from '../components/Otp';
import Dashboard from '../components/Dashboard';


const AuthRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedUserRoutes>
            <MapWrapper />
          </ProtectedUserRoutes>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <Dashboard />
        } />
        <Route path="/otp" element={<Otp/>} />

      </Routes>
    </Router>
  );
};

export default AuthRoutes;
