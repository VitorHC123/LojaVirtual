import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Registrar = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirma, setConfSenha] = useState('');
    const navigate = useNavigate();

    const validaUsuario = async () => {
        if (!usuario || !senha || !confirma) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        if (senha !== confirma) {
            alert("As senhas não coincidem. Tente novamente.");
            return;
        }

        const url = "https://backend-completo.vercel.app/app/registrar";
        const dados = {
            usuario,
            senha,
            confirma
        };

        try {
            const response = await axios.post(url, dados);
            if (response.status === 200) {
                alert("Registrado com sucesso!");
                navigate('/login');
            }
        } catch (error) {
            console.error("Erro completo:", error); 
            if (error.response?.data?.error) {
                alert(`Erro: ${error.response.data.error}`);
            } else {
                alert("Erro ao registrar. Tente novamente mais tarde.");
            }
        }
    };

    const irParaLogin = () => {
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>Registrar Usuário</h1>

                <input
                    type="text"
                    placeholder="Usuário"
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    onChange={(e) => setConfSenha(e.target.value)}
                />
                <input
                    type="button"
                    value="Registrar"
                    onClick={validaUsuario}
                />
                <input
                    type="button"
                    value="Voltar"
                    onClick={irParaLogin}
                />
            </div>
        </div>
    );

};

export default Registrar;
