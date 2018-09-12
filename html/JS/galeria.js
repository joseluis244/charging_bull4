
function rot_img(rot,este){
    var rotacion_img = este.parentElement.getElementsByTagName("img")[0].style.transform;
    if(rotacion_img == ""){
        var V_rot = 0 + rot;
        este.parentElement.getElementsByTagName("img")[0].style.transform = "rotate("+V_rot+"deg)"
    }
    else{
        var str_rot = este.parentElement.getElementsByTagName("img")[0].style.transform.split("(")[1].split("deg")[0];
        var V_rot = parseInt(str_rot) + rot;
        este.parentElement.getElementsByTagName("img")[0].style.transform = "rotate("+V_rot+"deg)"
    }
}