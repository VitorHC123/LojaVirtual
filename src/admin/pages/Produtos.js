import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, TextField, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, FormControl
} from '@mui/material';
import api from '../../services/api';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState({
    nome: '', descricao: '', preco: 0, quantidade: 0,
    imagem: '', categoria: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    listarProdutos();
    listarCategorias();
  }, []);

  const listarProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (err) {
      console.error('Erro ao listar produtos', err);
    }
  };

  const listarCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (err) {
      console.error('Erro ao listar categorias', err);
    }
  };

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    try {
      if (editandoId) {
        await api.put('/produtos', { id: editandoId, ...produto });
      } else {
        await api.post('/produtos', produto);
      }
      setProduto({
        nome: '', descricao: '', preco: 0, quantidade: 0,
        imagem: '', categoria: ''
      });
      setOpen(false);
      setEditandoId(null);
      listarProdutos();
    } catch (err) {
      console.error('Erro ao salvar produto', err);
    }
  };

  const handleEditar = (p) => {
    setProduto(p);
    setEditandoId(p._id);
    setOpen(true);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await api.delete('/produtos', { data: { id } });
        listarProdutos();
      } catch (err) {
        console.error('Erro ao excluir produto', err);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Produtos</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Novo Produto</Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.nome}</TableCell>
                <TableCell>R$ {p.preco.toFixed(2)}</TableCell>
                <TableCell>{p.quantidade}</TableCell>
                <TableCell>{p.categoria}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEditar(p)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => handleExcluir(p._id)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editandoId ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        <DialogContent>
          <TextField name="nome" label="Nome" fullWidth value={produto.nome} onChange={handleChange} margin="normal" />
          <TextField name="descricao" label="Descrição" fullWidth value={produto.descricao} onChange={handleChange} margin="normal" />
          <TextField name="preco" label="Preço" type="number" fullWidth value={produto.preco} onChange={handleChange} margin="normal" />
          <TextField name="quantidade" label="Quantidade" type="number" fullWidth value={produto.quantidade} onChange={handleChange} margin="normal" />
          <TextField name="imagem" label="URL da Imagem" fullWidth value={produto.imagem} onChange={handleChange} margin="normal" />

          <FormControl fullWidth margin="normal">
            <InputLabel>Categoria</InputLabel>
            <Select name="categoria" value={produto.categoria} onChange={handleChange}>
              {categorias.map((cat) => (
                <MenuItem key={cat._id} value={cat.nome}>{cat.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSalvar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Produtos;
