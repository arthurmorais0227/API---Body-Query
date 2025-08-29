// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos } = dados
// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

// Body Parameters no Node.js - Criar novo bruxo

app.post('/bruxos', (req, res) => {
    // Acessando dados do body
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;
    
    console.log('Dados recebidos:', req.body);
    
    // Validação básica
    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        });
    }
    
    // Criar novo bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Ainda não definida",
        mascote: mascote || "Ainda não definido",
        patrono: patrono || "Ainda não descoberto",
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };
    
    // Adicionar à lista de bruxos
    bruxos.push(novoBruxo);
    
    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});