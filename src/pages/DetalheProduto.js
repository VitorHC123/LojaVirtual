import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container, Typography, Button, Grid, Card, CardMedia, CardContent
} from '@mui/material';
import api from '../../services/api';

function DetalheProduto() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const buscar = async () => {
            try {
                const response = await api.get(`/produtos/${id}`);
                setProduto(response.data);
            } catch (err) {
                console.error('Erro ao buscar produto', err);
            }
        };
        buscar();
    }, [id]);

    if (!produto) return <p>Carregando...</p>;

    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={produto.imagem}
                            alt={produto.nome}
                            sx={{ maxHeight: 400 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">{produto.nome}</Typography>
                    <Typography variant="subtitle1">{produto.descricao}</Typography>
                    <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                        R$ {produto.preco.toFixed(2)}
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                        Adicionar ao Carrinho
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DetalheProduto;
