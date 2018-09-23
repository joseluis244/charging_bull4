const mongoose = require("mongoose");
const clientes = require("./models/clientes");
mongoose.connect("mongodb://127.0.0.1/RB2");
var j =0
clientes.find({},function(err,cli){
    for(i=0;i<=cli.length-1;i++){
        if(cli[i].vitacora.length > 2){
            clientes.update({_id:cli[i]._id},{
                "vitacora.2.GPS.0":cli[i].GPS[0],
                "vitacora.2.GPS.1":cli[i].GPS[1],
                "vitacora.2.GPS.2":100
            },function(){})
        }
    }
    console.log(j)
});