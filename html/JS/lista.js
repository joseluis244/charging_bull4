function buscar(filtro){
    var elementos = document.getElementById("lista_clientes").getElementsByTagName("li");
    for(i=0; i<=elementos.length-1;i++){
        var filtrado = elementos[i].getElementsByTagName("span")[0].innerHTML.toUpperCase();
        if(filtrado.indexOf(filtro.toUpperCase())>-1){
            elementos[i].style.display = "";
        }
        else{
            elementos[i].style.display = "none";
        }
        
    }
}
function buscar_alrededor_fun(){
    var btn = document.getElementsByClassName("buscar_alrededor")[0].getElementsByTagName("button")[0].getElementsByTagName("i")[0];
    btn.innerHTML = "gps_fixed"
}