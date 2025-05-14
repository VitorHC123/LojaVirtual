import React from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import useCarrinho from '../../hooks/useCarrinho';
import api from '../../services/api';

function Carrinho() {
  const { carrinho, remover, limpar } = useCarrinho();

  const finalizarCompra = async () => {
    try {
      const produtosFormatados = carrinho.map(({ nome, quantidade, preco }) => ({ nome, quantidade, preco }));
      const venda = {
        nomeCliente: 'Cliente Exemplo', 
        data: new Date().toISOString().split('T')[0],
        produtos: produtosFormatados
      };
      await api.post('/venda', venda);
      alert('Compra finalizada com sucesso!');
      limpar();
    } catch (err) {
      alert('Erro ao finalizar a compra');
    }
  };

  const total = carrinho.reduce((sum, p) => sum + p.preco * p.quantidade, 0);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>
      {carrinho.length === 0 ? (
        <Typography>Seu carrinho está vazio.</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carrinho.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>R$ {item.preco.toFixed(2)}</TableCell>
                  <TableCell>R$ {(item.preco * item.quantidade).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => remover(item._id)}>Remover</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h6" sx={{ mt: 2 }}>Total: R$ {total.toFixed(2)}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={finalizarCompra}>
            Finalizar Compra
          </Button>
        </>
      )}
    </Container>
  );
}

export default Carrinho;
