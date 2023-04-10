const express = require("express");

require("dotenv").config();

const sequelize = require("./config/db");


const PORT = process.env.PORT || 4000;
const app = express()

//normal middleware
app.use(express.json());



app.get("/", async (req, res) => {
    res.status(200).send("Welcome Dude!");
});


app.listen(PORT, async () => {
    console.log(`Server is Started At Port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: false })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});