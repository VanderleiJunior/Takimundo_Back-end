const express = require("express");


const usersRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


//Cadastro de usuarios (Create)
usersRoutes.post("/users", async(request, response) => {
    const {name, email, password} = request.body;

    try{
        const user = await prisma.Users.create({
            data: {
                name,
                email,
                password
            }
        })

        return response.status(201).json(user)
    } catch (e) {
        console.log(e)
    }
});

//Login (Read)
usersRoutes.get("/users/:name/:password", async (request, response) => {
    const {name, password} = request.params;

    const userExist = await prisma.Users.findFirst({where: { name, password}});

    if(!userExist) {
        return response.status(404).json("User not exist");
    };

    return response.status(200).json("User Exist");
})

module.exports = usersRoutes;