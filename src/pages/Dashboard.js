import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom';
import Login from '../auth/Login';
import Registrar from '../auth/Registrar';
import Layout from '../components/Layouts'

const Middleware = () => {
    var logado = localStorage.getItem("Cliente");

    if (logado) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

const Dashboard = () => {
    return(
        <BrowserRouter>
        <div>
            <nav>
                <Layout/>
            </nav>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route element={<Middleware />}>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    {/* <Route path="/produtos" element={<Produtos />} /> */}
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
    )
}

export default Dashboard