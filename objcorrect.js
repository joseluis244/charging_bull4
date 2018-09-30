"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/RB2");
const clientes =require("./models/clientes");
var corregidos = 0;
clientes.find({ $or: [ { "distribuye": true }, { "distribuye": false } ] },function(err,cli){
    for (let i = 0; i <= cli.length - 1; i++) {
        for (let j = 0; j <= cli[i].vitacora.length - 1; j++) {
            if (typeof cli[i].vitacora[j].GPS[0] == "object") {
                let paso1 = JSON.stringify(cli[i].vitacora[j].GPS[0]).split(":")
                let paso2 = [parseFloat(paso1[1].split(",")[0]), parseFloat(paso1[2].split(",")[0]), parseFloat(paso1[3].split("}")[0])]
                corregidos ++;
                clientes.update({ _id: cli[i]._id, "vitacora._id": cli[i].vitacora[j]._id }, { "vitacora.$.GPS": paso2 }, function () { });
                //console.log(typeof cli[0].vitacora[0].GPS[0])
            }
        }
    }
    console.log(corregidos)

})