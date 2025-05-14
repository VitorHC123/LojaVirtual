import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import api from '../../services/api';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    listarCategorias();
  }, []);

  const listarCategorias = async () => {
    try {
      const response = await api.get('/categoria');
      setCategorias(response.data);
    } catch (err) {
      console.error('Erro ao listar categorias:', err);
    }
  };

  const handleSalvar = async () => {
    try {
      if (editando) {
        await api.put(`/categoria/${editando.id}`, { nome });
      } else {
        await api.post('/categoria', { nome });
      }
      setNome('');
      setEditando(null);
      setOpen(false);
      listarCategorias();
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const handleEditar = (categoria) => {
    setEditando(categoria);
    setNome(categoria.nome);
    setOpen(true);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await api.delete(`/categoria/${id}`);
        listarCategorias();
      } catch (err) {
        console.error('Erro ao excluir:', err);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Categorias</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Nova Categoria</Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.nome}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditar(cat)}>Editar</Button>
                  <Button color="error" onClick={() => handleExcluir(cat.id)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editando ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSalvar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Categorias;
