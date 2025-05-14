import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Admin() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Área Administrativa</h1>
      <Button variant="contained" onClick={logout}>Sair</Button>
      <div style={{ marginTop: 20 }}>
        <Link to="/admin/categorias">
          <Button variant="outlined">Gerenciar Categorias</Button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;
