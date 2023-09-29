// Importar o pacote express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//Instanciar o express ma variavel app
const app = express();

//Recuperar pacote dotenv
const dotenv = require('dotenv').config();
const server = http.createServer(app);
const io = socketIo(server);

//Importando variavel do arquivo .env
const PORT = process.env.PORT;

io.on('connection', (socket) => {
    console.log('Um jogador conectou');

    // Lógica de jogo e manipulação de eventos Socket.io aqui.

    socket.on('disconnect', () => {
        console.log('Um jogador desconectou');
    });
});


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

