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
import CategoriasAdmin from "../admin/pages/Categoria";
import DashboardAdmin from "../admin/pages/Dashboard"
import ProdutosAdmin from "../admin/pages/Produtos";
import VendasAdmin from "../admin/pages/Vendas";
import Dashboard from "./Dashboard"
import Agradecimento from "./Agradecimento"
import Produtos from "./Produtos";
import DetalheProduto from "./DetalheProduto"
import Carrinho from "./Carrinho"

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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/produtos" element={<Produtos />} />
                     <Route path="/agradecimento" element={<Agradecimento />} />
                     <Route path="/detalhe-produto/:id" element={<DetalheProduto />} />
                     <Route path="/carrinho" element={<Carrinho />} />


                    <Route path="/produtos-admin" element={<ProdutosAdmin />} />
                    <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                    <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                    <Route path="/categorias" element={<CategoriasAdmin />} />
                    <Route path="/vendas" element={<VendasAdmin />} />
                    
                </Route>
            </Routes>
        </div>
    </BrowserRouter>
    )
}

export default Dashboard