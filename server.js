const express = require("express");
const Rutas = require("./rutas");
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const app = express();

//use
app.use(express.static("html"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname+"/html/IMG/redbull-icon.png"));
app.use(function(req,res,next){console.log(req.body);next()})


//Rutas
Rutas.RGET(app);
Rutas.RPOST(app);

//inicia servicor
app.listen(3000,function(){
    console.log("Servidor iniciado");
})
