const express = require("express");

const usersRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


//Cadastro de usuarios (Create)
usersRoutes.post("/users", async(request, response) => {
    const {name, email, password, dtNasc} = request.body;

    const user = await prisma.Users.create({
        data: {
            name,
            email,
            password,
            dtNasc
        }
    });

    return response.status(201).json(user)
});

//Login (Read)
usersRoutes.get("/users", async (request, response) => {
    const users = await prisma.Users.findMany()

    return response.status(200).json(users)
})



module.exports = usersRoutes;