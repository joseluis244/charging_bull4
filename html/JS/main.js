if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    document.getElementsByClassName("mainheadermenu")[0].style.display = "none"
}
inicio();
function inicio() {
    document.getElementsByTagName("main")[0].style.display = "none";
    $("main").load("/dash", function () {
    })
    setTimeout(function () {
        document.getElementsByTagName("main")[0].style.display = "inline-block";
        document.getElementsByClassName("espera")[0].style.display = "none";
    }, 2000)
}
function cargar(carga){
    document.getElementsByClassName("espera")[0].style.display = "flex";
    $.get(carga,function(data){
        $("main").html(data);
        document.getElementsByClassName("espera")[0].style.display = "none";
    })
}
function cargarP(carga){
    document.getElementsByClassName("espera")[0].style.display = "flex";
    let fecha = new Date();
    let year = fecha.getFullYear();
    let mes = fecha.getMonth();
    $.post(carga,{year:year,mes:mes},function(data){
        $("main").html(data);
        document.getElementsByClassName("espera")[0].style.display = "none";
    })
}
function descargarexcel(sel){
    switch(sel){
        case 1:  location.href = "./excel"
        break;
        case 2:  location.href = "./excel2"
        break;
        case 3:  location.href = "./excel3"
        break;
    }
}