const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RB2', {useNewUrlParser: true});

const clientes = require('../models/clientes');

let buscar = async ()=>{
    let lista = await clientes.find({ "distribuye": { $exists: true },"ciudad": { $exists: true } },{vitacora:1},{sort:{ "ciudad": -1, "ultima_visita": -1}} );
    let repetidos =[]
    for(let i = 0; i<=lista.length-1;i++){
        for(let j=0;j<=lista[i].vitacora.length-1;j++){
                let fecha = new Date(lista[i].vitacora[j].fecha);
                fecha = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
                for(let x = j+1;x<=lista[i].vitacora.length-1;x++){
                    let fecha2 = new Date(lista[i].vitacora[x].fecha);
                    fecha2 = fecha2.getFullYear()+'-'+(fecha2.getMonth()+1)+'-'+fecha2.getDate()
                    if(fecha === fecha2){
                        repetidos.push({cliente:lista[i]._id,pos:j})
                        break;
                    }
                }
            }
    }
    let cli = repetidos[0].cliente;
    let repetidos2 = [{cliente:cli,pos:[repetidos[0].pos]}];
    let j=0;
    for(let i=1;i<=repetidos.length-1;i++){
        if(repetidos[i].cliente === cli){
            repetidos2[j].pos.push(repetidos[i].pos)
        }
        else{
            repetidos2.push(
                {cliente:repetidos[i].cliente,pos:[repetidos[i].pos]}
            )
            cli = repetidos[i].cliente;
            j++;
        }
    }
    console.log('total de '+repetidos2.length)
}

buscar();