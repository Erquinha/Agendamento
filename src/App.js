const express = require('express');
const { getUserById } = require('./db/dbConnection');
const app = express();
const { getUserById } = require('./dbConnection');

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.json(user);

        } else {
            res.status(404).json({ message: 'Usuario nao existe'});

                }
    } catch (erros) {
        res.status(500).json({message: 'Erro de coneão com BD'})
    }

});

module.exports = app;