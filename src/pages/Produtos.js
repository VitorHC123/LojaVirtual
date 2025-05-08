import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, TextField, Button, Card, CardContent, CardMedia, CssBaseline } from '@mui/material';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    quantidade: 0,
    preco: 0,
    descricao: '',
    imagem: '',
  });

  const listarProdutos = async () => {
    try {
      const token = localStorage.getItem('ALUNO_ITE');
      const response = await axios.get('https://backend-aula.vercel.app/app/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProdutos(response.data); 
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      alert('Erro ao carregar produtos. Tente novamente.');
    }
  };

  const cadastrarProduto = async () => {
    try {
      const token = localStorage.getItem('ALUNO_ITE');
      const response = await axios.post(
        'https://backend-aula.vercel.app/app/produtos',
        novoProduto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Produto cadastrado com sucesso!');
      listarProdutos(); 
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  const buscarProdutoPorNome = async () => {
    try {
      const token = localStorage.getItem('ALUNO_ITE');
      const response = await axios.get(
        `https://backend-aula.vercel.app/app/produtos/${nomeProduto}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProdutos(response.data); 
    } catch (error) {
      console.error('Erro ao buscar produto por nome:', error);
      alert('Erro ao buscar produto. Tente novamente.');
    }
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <CssBaseline>
      <Box sx={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Produtos
        </Typography>

        
        <TextField
          label="Buscar Produto por Nome"
          variant="outlined"
          fullWidth
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={buscarProdutoPorNome}>
          Buscar
        </Button>

        <Typography variant="h6" align="center" sx={{ marginTop: '40px' }}>
          Cadastrar Novo Produto
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Quantidade"
            variant="outlined"
            type="number"
            value={novoProduto.quantidade}
            onChange={(e) => setNovoProduto({ ...novoProduto, quantidade: e.target.value })}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Preço"
            variant="outlined"
            type="number"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            value={novoProduto.descricao}
            onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Imagem"
            variant="outlined"
            value={novoProduto.imagem}
            onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
            sx={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="secondary" onClick={cadastrarProduto}>
            Cadastrar Produto
          </Button>
        </Box>

        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '40px' }}>
          {produtos.map((produto) => (
            <Grid item key={produto._id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={produto.imagem}
                  alt={produto.nome}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {produto.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantidade: {produto.quantidade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preço: R${produto.preco}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Descrição: {produto.descricao}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </CssBaseline>
  );
};

export default Produtos;
