import React, {useState} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    var [usuario, setUsuario] = useState('')
    var [senha, setSenha] = useState('')
    const navigate = useNavigate();

    const validaUsuario = async () => {
        var url = "https://backend-completo.app/app/login"
        var dados = {
            usuario,
            senha
        }

        await axios.post(
            url,
            dados
        ).then(retorno =>{
            console.log( retorno )
            if (retorno.data.error){
                alert(retorno.data.error)
                return
            }
            if(retorno.data.token){
                localStorage.setItem("Cliente", retorno.data.token)
            }
        })
    }

    const irParaRegistrar = () => {
        navigate('/registrar');  
    };


    return(
        <div>
            <h1>Faça seu login</h1>

            <input type="text" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)}/>
            <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)}/>
            <input type="button" value="Logar" onClick={() => validaUsuario()}/>
            <input type="button" value="Registrar" onClick={ irParaRegistrar }/>
        </div>
    )

}

export default Login