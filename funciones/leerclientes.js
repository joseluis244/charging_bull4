const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});

const clientes = require('../models/clientes');


async function leercompleta(){
    let listafinal = {};
    let lista = await clientes.find({ "distribuye": { $exists: true },"ciudad": { $exists: true } },{ "nombre": 1, "direccion": 1, "ultima_visita": 1,"ciudad":1},{sort:{ "ciudad": -1, "ultima_visita": -1}} );
    listafinal[lista[0].ciudad]=[lista[0]]
    return(lista)
}

async function leercompletausr(ciudad){
    let listafinal = {};
    let lista = await clientes.find({ "distribuye": { $exists: true },"ciudad": ciudad },{ "nombre": 1, "direccion": 1, "ultima_visita": 1,"ciudad":1},{sort:{ "ciudad": -1, "ultima_visita": -1}} );
    listafinal[lista[0].ciudad]=[lista[0]]
    return(lista)
}

module.exports.leercompleta = leercompleta;
module.exports.leercompletausr = leercompletausr;