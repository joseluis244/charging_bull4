var distribuye,nombre_distribuidor,vende_frio,V_comentario;
var b_precios=[0,0,0,0,0];
var lista_cooler = [];
var lista_visibility = [];
var siguiente = document.getElementById("boton_encuesta");
distribuye = "si"
nombre_distribuidor = "D&M"
vende_frio = "si"
V_comentario = ""
siguiente.addEventListener("click",function(e){
    document.getElementById("pagina-1").style.display = "none";
    document.getElementById("pagina-2").style.display = "block";
    console.log(lista_visibility)
})