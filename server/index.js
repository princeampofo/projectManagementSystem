// Require express, mysql, exphbs an initialise it
const express = require("express");
const mysql = require("mysql");
const exphbs = require("express-handlebars");
const app = express();

// require and configure env
const dotenv = require("dotenv");
dotenv.config();

// Use env port or specified port
const port = process.env.PORT || 8080;

// serve static files, pares json , parse urlencoded bodies
app.use(express.static("../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Templating Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

const route = require("./routes/userRoutes");

app.use("/", route);

app.listen(port, () => console.log(`app is running on port ${port}`));
