const mongoose = require("mongoose");
const clientes = require("./models/clientes");
mongoose.connect("mongodb://127.0.0.1/RB2");
var j =0
clientes.find({},function(err,cli){
    var a = cli[2300].productos[0].P_nombre.split("\n")[1].split("  ");
    var a1 = cli[2300].productos[1].P_nombre.split("\n")[1].split("  ");
    var a2 = cli[2300].productos[2].P_nombre.split("\n")[1].split("  ");
    var a3 = cli[2300].productos[3].P_nombre.split("\n")[1].split("  ");
    var a4 = cli[2300].productos[4].P_nombre.split("\n")[1].split("  ");
    console.log(a[a.length-1])
    console.log(a1[a1.length-1])
    console.log(a2[a2.length-1])
    console.log(a3[a3.length-1])
    console.log(a4[a4.length-1])
});