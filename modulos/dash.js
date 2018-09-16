const mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/RB2';
var Cli = require("../models/clientes");
const math = require('mathjs')
mongoose.connect(mongoDB);
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
module.exports.moda = moda;
module.exports.datos = datos;
module.exports.distribuidor = distribuidor;