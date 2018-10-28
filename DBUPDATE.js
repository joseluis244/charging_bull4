"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/RB2");
const clientes =require("./models/clientes");

clientes.find({tipo:""},function(err,cli){
    for(let i=0;i<=cli.length-1;i++){
        clientes.update({_id:cli[i]._id},{tipo:"Tienda de Barrio"},function(){});
    }
    console.log(cli)
})