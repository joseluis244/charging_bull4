function buscarcliente(este){
    var filtro = este.value.toUpperCase();
    var item = document.getElementsByClassName("li_item");
    for(i=0;i<=item.length-1;i++){
        var nombre = item[i].getElementsByClassName("mdl-list__item-primary-content")[0].getElementsByTagName("span")[0].innerHTML.toUpperCase();
        if(nombre.indexOf(filtro) > -1){
            item[i].style.display = ""
        }
        else{
            item[i].style.display = "none"
        }
    }
}