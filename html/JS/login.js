function login(){
    $.post("/login",{username:$("input[name=username]").val(),password:$("input[name=password]").val()},function(data){
        if(data != "error"){
            location.href = data;
        }
        else{
            document.getElementsByClassName("msg")[0].innerHTML = "Falla de autenticación"
        }
    })
}