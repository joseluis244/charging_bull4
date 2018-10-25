function guardarciudad(este){
    ciudad = este.value;
}
function guardartipo(este){
    tipo = este.value;
}
function guardarID(este){
    CLI_ID = este.value;
}
function guardarNOMBRE(este){
    CLI_nombre = este.value;
}
function guardarDIRECCION(este){
    DIRECCION = este.value;
}
function guardarCONTACTO(este){
    CONTACTO = este.value;
}
function guardarNUMERO_CONTACTO(este){
    NUMERO_CONTACTO = este.value;
}
function guardar_servidor(){
    if (CLI_nombre != "" && DIRECCION != "" && tipo != "" && CONTACTO != "" && NUMERO_CONTACTO != "") {
        var envio = [ID,CLI_ID, CLI_nombre, DIRECCION, ciudad, tipo, CONTACTO, NUMERO_CONTACTO];
        $.post("/corregir_datos",{datos:envio.toString()},function(data){
            window.location.href = "/ficha?clid="+data;
        })
    }
    else{
        document.getElementsByClassName("mensajes")[0].style.display = "grid";
        document.getElementById("mensaje_estado").innerHTML = "Faltan datos"
    }
}
