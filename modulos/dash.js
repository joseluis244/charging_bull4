/*const mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/RB2';*/
var Cli = require("../models/clientes");
const math = require('mathjs')
//mongoose.connect(mongoDB);
var registrados;


var datos = function (callback){
    var vende=0;
    var redbull=0;
    Cli.find({},{ "productos": 1, "distribuye": 1},function(err,cli){
        registrados = cli.length;
        for(i=0;i<=cli.length-1;i++){
            if(cli[i].distribuye == true){
                vende++;
                if(cli[i].productos[0].P_precio > 0){
                    redbull++;
                }
            }
        }
        var ara = [registrados,vende,redbull];
        callback(ara);
    })
}
var moda = function(callback) {
    Cli.find({ "distribuye": true }, { "productos": 1 }, function (err, cli) {
        var redbull = [];
        var rush = [];
        var ciclon = [];
        var black = [];
        var monst = [];
        var cantidad = [0,0,0,0,0];
        for (i = 0; i <= cli.length - 1; i++) {
            if (cli[i].productos[0].P_precio > 0) {
                redbull.push(cli[i].productos[0].P_precio);
                cantidad[0]++;
            }
            if (cli[i].productos[1].P_precio > 0) {
                rush.push(cli[i].productos[1].P_precio);
                cantidad[1]++;
            }
            if (cli[i].productos[2].P_precio > 0) {
                ciclon.push(cli[i].productos[2].P_precio);
                cantidad[2]++;
            }
            if (cli[i].productos[3].P_precio > 0) {
                black.push(cli[i].productos[3].P_precio);
                cantidad[3]++;
            }
            if (cli[i].productos[4].P_precio > 0) {
                monst.push(cli[i].productos[4].P_precio);
                cantidad[4]++;
            }
        }
        var moda = [math.mode(redbull)[0], math.mode(rush)[0], math.mode(ciclon)[0], math.mode(black)[0], math.mode(monst)[0]]
        callback(moda,cantidad);
    })
}
var distribuidor = function(callback){
    Cli.find({},{"tipo":1},{sort:{"tipo":1}},function(err,cli){
        var valor = [];
        var lab = [];
        var tipo = cli[0].tipo;
        var cont = 1;
        lab.push(tipo);
        var i =1;
        while(i<=cli.length-1){
            if(cli[i].tipo==tipo){
                cont++;
                i++;
            }
            else{
                valor.push(cont);
                cont = 0;
                tipo = cli[i].tipo;
                lab.push(tipo);
            }
        }
        valor.push(cont)
        var obj = {lab,valor}
        callback(obj);
    })
}
var cant_cooler = function (callback) {
    var coolers = [];
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Propio.*/i }, function (err, co) {
        coolers[0] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Baby Cooler.*/i }, function (err, co) {
        coolers[1] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Slim Cooler.*/i }, function (err, co) {
        coolers[2] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Can Cooler.*/i }, function (err, co) {
        coolers[3] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Equipo de la competencia.*/i }, function (err, co) {
        coolers[4] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Fast Lane Open.*/i }, function (err, co) {
        coolers[5] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Small Open Front.*/i }, function (err, co) {
        coolers[6] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Mega Glass Door.*/i }, function (err, co) {
        coolers[7] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Slim Fast Lane.*/i }, function (err, co) {
        coolers[8] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.0.L_material": /.*Refuel Cooler.*/i }, function (err, co) {
        coolers[9] = co;
    })
    setTimeout(function () {
        callback(coolers);
    }, 1000);
}
var cant_visi = function (callback) {
    var visi = [];
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Colgante.*/i }, function (err, co) {
        visi[0] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Sticker de lata.*/i }, function (err, co) {
        visi[1] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Marca Precio.*/i }, function (err, co) {
        visi[2] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Cartoon.*/i }, function (err, co) {
        visi[3] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Lata Aluminio.*/i }, function (err, co) {
        visi[4] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Sticky shlef.*/i }, function (err, co) {
        visi[5] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Carrileras.*/i }, function (err, co) {
        visi[6] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Two Cans.*/i }, function (err, co) {
        visi[7] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Parasite SC.*/i }, function (err, co) {
        visi[8] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Parasite 4Pack.*/i }, function (err, co) {
        visi[9] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Dispensador Lata.*/i }, function (err, co) {
        visi[10] = co;
    })
    Cli.countDocuments({ "distribuye": true, "materiales.1.L_material": /.*Rack.*/i }, function (err, co) {
        visi[11] = co;
    })
    setTimeout(function () {
        callback(visi);
    }, 1000);
}
module.exports.moda = moda;
module.exports.datos = datos;
module.exports.distribuidor = distribuidor;
module.exports.cant_cooler = cant_cooler;
module.exports.cant_visi = cant_visi;