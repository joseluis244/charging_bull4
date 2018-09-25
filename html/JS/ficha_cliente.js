document.getElementsByClassName("nav_item")[0].style.borderBottomColor = "#ff1744";
$(".nav_item").click(function(){
    $(".nav_item").css("border-bottom-color","#031e3c");
    $(this).css("border-bottom-color","#ff1744");
    var selector = $(this).html();
    $("main .ventana").hide();
    $("#"+selector).show();
})
function nueva_encuesta(id){
    document.location.href = "./encuesta?clid="+id;
}
function irPGS(lat,lng){
    window.open("https://www.google.com/maps/dir/?api=1&destination="+lat+","+lng);
}
function cargargaleria(id){
    //console.log(id);
    $.post("/galeriafotos",{id:id},function(data){
        $("#Galeria").html(data);
    })
}

//$("#Galeria").post("./galeria.html")