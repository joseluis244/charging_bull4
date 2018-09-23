"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/RB2");
const clientes =require("./models/clientes");

clientes.find({ $or: [ { "distribuye": true }, { "distribuye": false } ] },function(err,cli){
    let ultimavisita = 0;
    let comentario = 0;
    let F_GPS = 0;
    for(let i=0;i<=cli.length-1;i++){
        //ultima visita
        if(cli[i].ultima_visita > 0){
            //console.log("existe");
        }
        else{
            if(cli[i].vitacora.length > 0){
                clientes.update({_id:cli[i]._id},{ultima_visita:cli[i].vitacora[ cli[i].vitacora.length-1 ].fecha},function(){});
                ultimavisita++;
            }
        }
        //fin ultima visita
        //comentario vitacora
        for(let j=0;j<=cli[i].vitacora.length-1;j++){
            if(typeof cli[i].vitacora[j].comentario != "string"){
                clientes.update({_id:cli[i]._id,"vitacora._id":cli[i].vitacora[j]._id},{$set:{"vitacora.$.comentario":cli[i].comentario}},function(){});
                comentario++;
            }
            if(typeof cli[i].vitacora[j].GPS[0] == "undefined"){
                clientes.update({_id:cli[i]._id,"vitacora._id":cli[i].vitacora[j]._id},{$set:{"vitacora.$.GPS.0":cli[i].GPS[0],"vitacora.$.GPS.1":cli[i].GPS[1],"vitacora.$.GPS.2":100}},function(){});
                F_GPS++;
            }
            //console.log(typeof cli[i].vitacora[j].GPS[0])
        }
        //fin comentario vitacora
    }
    console.log(ultimavisita+" archivos actualizados ultima visita")
    console.log(comentario+" comentarios")
    console.log(F_GPS+" Actualizados")
})