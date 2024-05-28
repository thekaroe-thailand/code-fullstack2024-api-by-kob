const express = require("express");
const app = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.post('/save', async (req, res) => {
    try {
        const rowBillSale = await prisma.billSale.create({
            data: {
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerAddress: req.body.customerAddress,
                payDate: new Date(req.body.payDate),
                payTime: req.body.payTime
            }
        });

        for (let i = 0; i < req.body.carts.length; i++) {
            const rowProduct = await prisma.product.findFirst({
                where: {
                    id: req.body.carts[i].id
                }
            })

            await prisma.billSaleDetail.create({
                data: {
                    billSaleId: rowBillSale.id,
                    productId: rowProduct.id,
                    cost: rowProduct.cost,
                    price: rowProduct.price
                }
            });
        }

        res.send({ message: 'success' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

app.get('/list', async (req, res) => {
    try {
        const results = await prisma.billSale.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        res.send({ results: results })
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

module.exports = app;