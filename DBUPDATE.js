const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/RB2");
const clientes =require("./models/clientes");

clientes.find({ $or: [ { "distribuye": true }, { "distribuye": false } ] },function(err,cli){
    let ultimavisita = 0;
    for(i=0;i<=cli.length-1;i++){
        if(cli[i].ultima_visita > 0){
            console.log("existe");
        }
        else{
            if(cli[i].vitacora.length > 0){
                ultimavisita++;
            }
        }
    }
    console.log(ultimavisita+" archivos actializados")
})