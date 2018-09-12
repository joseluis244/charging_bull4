const express = require("express");
const Rutas = require("./rutas");
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const app = express();

//use
app.use("/",express.static("html"));
app.use("/upload",express.static("upload"));
app.use("/node_modules",express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname+"/html/IMG/redbull-icon.png"));
//app.use(function(req,res,next){console.log(req.body);next()})


//Rutas
Rutas.RGET(app);
Rutas.RPOST(app);

//inicia servicor
app.listen(3000,function(){
    console.log("Servidor iniciado");
})
