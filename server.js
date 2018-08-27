const express = require("express");
const Rutas = require("./rutas");
const app = express();

//use
//app.use(express.static("html"))

//Rutas
Rutas.RGET(app);
Rutas.RPOST(app);

//inicia servicor
app.listen(3000,function(){
    console.log("Servidor iniciado");
})
