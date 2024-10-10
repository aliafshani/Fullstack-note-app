import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";

import Login from './pages/Login.jsx'
import Regester from './pages/Regester.jsx'
import Home from './pages/Home.jsx'
import NoteFaund from "./pages/NoteFaund.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function Logout() {
    localStorage.clear()
    return <Navigate to={'/login'} />
}


function RegisterAndLogout() {
    localStorage.clear()
    return <Regester />
}

export const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path={'/register'} element={<RegisterAndLogout />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/logout'} element={<Logout />} />
            <Route path={'*'} element={<NoteFaund />}></Route>
        </Routes>

    )
}
