const mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/RB2';
var Cli = require("./models/clientes");
const fs = require("fs");
mongoose.connect(mongoDB);
var contador =0;
Cli.find({ "fotos": { $exists: true } },{"fotos":1},function(err,cli){
    for(i=0;i<=cli.length-1;i++){
        for(j=0;j<=cli[i].fotos.length-1;j++){
            var dbnombre = cli[i].fotos[j].nombre;
            var existe = fs.existsSync("./uploads/"+dbnombre);
            contador=contador+1;
            //console.log(existe)
            if(existe == false){
                console.log(cli[i]._id)
                console.log(cli[i].fotos[j]._id)
            }
            /*if(existe == false){
                Cli.update({"_id":cli[i]._id},{$pull:{"fotos":{"_id":cli[i].fotos[j]._id}}},function(err){
                    console.log("Eliminado");
                })
            }*/
        }
    }
    console.log(contador)
})
//fs.unlinkSync("./uploads/upload_ffd1718c9dcac1855d3892ca4ae916c8");
/*fs.readdir("./uploads", (err, files) => {
    files.forEach(file => {
        var largo = file.split(".").length;
        if(file.split(".")[1] != "jpg")
        {
            console.log(file);
            fs.unlinkSync("./uploads/"+file);
        }
    });
})*/
