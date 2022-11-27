const express = require("express");

const commentsRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Criar novo comentario (Create);
commentsRoutes.post("/comments", async(request, response) => {
    const {conteudo, userName, idTema} = request.body;

    const comment = await prisma.Comentario.create({
        data: {
            conteudo,
            userName,
            idTema
        }
    });

    return response.status(201).json(comment);
});

//Ler os comentarios (read);
commentsRoutes.get("/comments/:idTema", async(request, response) => {
    const {idTema} = request.body;

    const comments = await prisma.Comentario.findMany({where: {idTema}});

    if(!comments) {
        return response.status(404).json("nao tem comentarios");
    }

    return response.status(200).json(comments);
})

module.exports = commentsRoutes;