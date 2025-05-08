import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Registrar = () => {
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')
    var [confirma, setConfSenha] = useState('')
    const navigate = useNavigate();

    const validaUsuario = async () => {
        var url = "https://backend-completo.app/app/registrar"
        var dados = {
            usuario,
            senha,
            confirma
        }

        await axios.post(
            url,
            dados
        ).then(retorno =>{
            console.log( retorno )
            if (!usuario || !senha || !confirma) {
                alert("Por favor, preencha todos os campos.");
                return;
            }
            if (senha !== confirma) {
                alert("As senhas não coincidem. Tente novamente.");
                return;
            }

            if(retorno){
                alert("Registrado com sucesso!")
                navigate('/login');
                return
            }
            else if (retorno.data.error){
                alert(retorno.data.error)
                return
            }
        })
    }

    return(
        <div>
            <h1>Registrar Usuário</h1>

            <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
            <input type="password" placeholder="Confirmar Senha" onChange={(e) => setConfSenha(e.target.value)} />
            <input type="button" value="Registrar" onClick={() => validaUsuario()} />
        </div>
    )

}

export default Registrar