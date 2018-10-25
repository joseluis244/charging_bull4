var distribuye = true;
var nombre_distribuidor = document.getElementById("distribuidor").value;
var lista_de_precios = document.getElementsByClassName("bebida");
var b_precios1 = [lista_de_precios[0].getElementsByTagName("div")[1].getElementsByTagName("input")[0].value,lista_de_precios[1].getElementsByTagName("div")[1].getElementsByTagName("input")[0].value,lista_de_precios[2].getElementsByTagName("div")[1].getElementsByTagName("input")[0].value,lista_de_precios[3].getElementsByTagName("div")[1].getElementsByTagName("input")[0].value,lista_de_precios[4].getElementsByTagName("div")[1].getElementsByTagName("input")[0].value,]
var b_precios = [parseFloat(b_precios1[0]),parseFloat(b_precios1[1]),parseFloat(b_precios1[2]),parseFloat(b_precios1[3]),parseFloat(b_precios1[4])]
var vende_frio = document.getElementById("switch-2").checked;
var lista_cooler = [];
var lista_visibility = [];
var share = [parseFloat(document.getElementsByClassName("share_block")[0].getElementsByTagName("input")[0].value),parseFloat(document.getElementsByClassName("share_block")[1].getElementsByTagName("input")[0].value)]
var V_comentario = document.getElementById("comentario").value
inicio_cooler();
inicio_vis();
function inicio_cooler(){
    let cooler = document.getElementsByClassName("cooler_block")
    for(i=0;i<=cooler.length-1;i++){
        if(cooler[i].getElementsByClassName("mdl-checkbox__input")[0].checked){
            lista_cooler.push(cooler[i].getElementsByClassName("mdl-checkbox__label")[0].innerHTML)
        }
    }
}
function inicio_vis(){
    let vis = document.getElementsByClassName("visi_block")
    for(i=0;i<=vis.length-1;i++){
        if(vis[i].getElementsByClassName("mdl-checkbox__input")[0].checked){
            lista_visibility.push(vis[i].getElementsByClassName("mdl-checkbox__label")[0].innerHTML)
        }
    }
}
function vende(este){
    if(este.checked){
        document.getElementById("vende_lab").innerHTML = "Si";
        distribuye = true;
    }else{
        document.getElementById("vende_lab").innerHTML = "No";
        distribuye = false;
    }
}
function distribuidor(este){
    if(este.value != "otro"){
        nombre_distribuidor = este.value;
        document.getElementById("nombre_distribuidor_nuevo").style.display = "none";
        este.style.borderBottomColor = "#031e3c";
    }
    else{
        nombre_distribuidor = "";
        document.getElementById("nombre_distribuidor_nuevo").style.display = "";
        document.getElementById("nombre_distribuidor_nuevo").value = "";
        este.style.borderBottomColor = "#b71c1c";
    }
}
function distribuidor1(este){
    nombre_distribuidor = este.value;
}
function asignar_precio1(pos,este){
    b_precios[pos] = parseFloat(este.value);
}
function frio(este){
    if(este.checked){
        vende_frio = true;
        document.getElementById("frio_lab").innerHTML = "Si";
    }
    else{
        vende_frio = false;
        document.getElementById("frio_lab").innerHTML = "No";
    }
}

function asignarcooler(este,pos){
    var cooler = este.parentElement.getElementsByClassName("mdl-checkbox__label")[0].innerHTML;
    var ind = lista_cooler.indexOf(cooler);
    if(este.checked){
        lista_cooler.push(cooler);
    }
    else{
        lista_cooler.splice(ind,1);
    }
}
function asignarvisibility(este,pos){
    var visibility = este.parentElement.getElementsByClassName("mdl-checkbox__label")[0].innerHTML;
    var ind = lista_visibility.indexOf(visibility);
    if(este.checked){
        lista_visibility.push(visibility);
    }
    else{
        lista_visibility.splice(ind,1);
    }
}
function setshare(pos,este){
    share[pos]=parseFloat(este.value);
}
function escribircomentario(este){
    V_comentario = este.value;
}
function guardar_datos(id){
    var obj={
    a:[document.location.href.split("?clid=")[1],V_id,distribuye,nombre_distribuidor,vende_frio,V_comentario].toString(),
    b:b_precios.toString(), 
    c:lista_cooler.toString(),
    d:lista_visibility.toString(),
    e:share.toString()
    }
    $.post("corregir_encuesta",{datos:obj.a,precios:obj.b,coolers:obj.c,visi:obj.d,share:obj.e},function(e){
        document.location.href = e;
    })
}