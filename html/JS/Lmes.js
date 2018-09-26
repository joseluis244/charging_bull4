function cambiar(este,dep){
    var cabeza = document.getElementsByClassName("cabeza")[0];
    cabeza.getElementsByTagName("div")[0].classList.remove("seccionado");
    cabeza.getElementsByTagName("div")[1].classList.remove("seccionado");
    este.classList.add("seccionado");
    document.getElementById("scz").classList.remove("dep_sel");
    document.getElementById("scz").classList.add("dep_no_sel");
    document.getElementById("lpz").classList.remove("dep_sel");
    document.getElementById("lpz").classList.add("dep_no_sel");
    document.getElementById(dep).classList.remove("dep_no_sel");
    document.getElementById(dep).classList.add("dep_sel");
    //alert(este)
}
function verdistancia(lat1,lng2,latO,lngO){
    window.open("https://www.google.com/maps/dir/?api=1&origin="+lat1+","+lng2+"&destination="+latO+","+lngO);
}
function irficha(id){
    location.href = "/ficha?clid="+id;
}