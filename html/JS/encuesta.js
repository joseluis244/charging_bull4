inicio_precio();
function inicio_precio(){
    var selector = document.getElementsByClassName("seccion")[2].getElementsByClassName("contenido")[0].getElementsByClassName("bebida");
    for(i=0;i<=selector.length-1;i++){
        selector[i].getElementsByClassName("precios")[0].getElementsByClassName("valor")[0].style.backgroundColor = "#b71c1c";
    }
}
function vende(este){
    if(este.checked){
        document.getElementById("vende_lab").innerHTML = "Si";
        distribuye = "si";
        $(".seccion_secundaria").show();
    }
    else{
        document.getElementById("vende_lab").innerHTML = "No";
        distribuye = "no";
        $(".seccion_secundaria").hide();
    }
}
function distribuidor(este){
    if(este.value != "otro"){
        nombre_distribuidor = este.value;
        document.getElementById("nombre_distribuidor_nuevo").style.display = "none";
        este.style.borderBottomColor = "#3f51b5";
    }
    else{
        nombre_distribuidor = "";
        document.getElementById("nombre_distribuidor_nuevo").style.display = "";
        este.style.borderBottomColor = "#b71c1c";
    }
}
function distribuidor1(este){
    nombre_distribuidor = este.value;
}
function asignar_precio(pos,valor,este){
    var selector = este.getAttribute("name");
    b_precios[pos] = valor;
    $("[name="+selector+"]").css("background-color","#3f51b5")
    este.style.backgroundColor = "#b71c1c";
    if(valor<0){
        este.parentElement.parentElement.getElementsByTagName("div")[2].style.display = "flex";
    }
    else{
        este.parentElement.parentElement.getElementsByTagName("div")[2].style.display = "none";
    }
}
function asignar_precio1(pos,este){
    b_precios[pos] = parseFloat(este.value);
}
function frio(este){
    if(este.checked){
        vende_frio = "si";
    }
    else{
        vende_frio = "no";
    }
}
function asignarcooler(este,pos){
    var cooler = este.parentElement.getElementsByClassName("mdl-checkbox__label")[0].innerHTML;
    var ind = lista_cooler.indexOf(cooler);
    if(este.checked){
        lista_cooler.splice(pos,0,cooler);
    }
    else{
        lista_cooler.splice(ind,1);
    }
}
function asignarvisibility(este,pos){
    var visibility = este.parentElement.getElementsByClassName("mdl-checkbox__label")[0].innerHTML;
    var ind = lista_visibility.indexOf(visibility);
    if(este.checked){
        lista_visibility.splice(pos,0,visibility);
    }
    else{
        lista_visibility.splice(ind,1);
    }
}
function escribircomentario(este){
    V_comentario = este.value;
}