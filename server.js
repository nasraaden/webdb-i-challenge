const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require("./accounts/acountsRouter.js")

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter)

server.get("/", (req, res) => {
    res.send("It's working!!!")
});

module.exports = server;