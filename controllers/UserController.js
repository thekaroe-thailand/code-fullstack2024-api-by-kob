const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

app.post('/signIn', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true
            },
            where: {
                user: req.body.user,
                pass: req.body.pass,
                status: 'use'
            }
        })
        //console.log(user);
        if (user != null) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '30d' });

            return res.send({ token: token });
        }

        res.status(401).send({ message: 'unauthorized' });
    } catch (e) {
        res.status(500).send({ error: e.messsag });
    }
})

module.exports = app;