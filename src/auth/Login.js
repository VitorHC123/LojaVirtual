import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/AuthForm.css'

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const validaUsuario = async () => {
        if (!usuario || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const url = "https://backend-completo.vercel.app/app/login";
        const dados = { usuario, senha };

        try {
            const retorno = await axios.post(url, dados);
            console.log(retorno);

            if (retorno.data.token) {
                localStorage.setItem("Cliente", retorno.data.token);
                navigate('/Dashboard');
            } else if (retorno.data.error) {
                alert(`Erro: ${retorno.data.error}`);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Erro: ${error.response.data.error}`);
            } else {
                alert("Erro ao conectar. Tente novamente mais tarde.");
            }
        }
    };

    const irParaRegistrar = () => {
        navigate('/registrar');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>Faça seu login</h1>

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
                    type="button"
                    value="Logar"
                    onClick={validaUsuario}
                />
                <input
                    type="button"
                    value="Registrar"
                    onClick={irParaRegistrar}
                    className="secondary-button"
                />
            </div>
        </div>
    );

};

export default Login;