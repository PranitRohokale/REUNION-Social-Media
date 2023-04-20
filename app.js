const express = require("express");
const cors = require("cors");

require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  

const sequelize = require("./config/db");

const userRoute = require("./Routers/user")
const postRoute = require("./Routers/post")
const commentRoute = require("./Routers/comment")
const likesRoute = require("./Routers/likes")


const PORT = process.env.PORT || 4000;
const app = express()

//normal middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use("/api", [userRoute, postRoute, commentRoute, likesRoute])

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