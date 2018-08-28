var Cliente = "";
function RGET (app) {
    app.get("/", function (req, res) {
        res.sendfile("html/main.html")
    })
    app.get("/dash", function (req, res) {
        
        res.sendfile("html/dash.html");
    })
}
function RPOST(app) {
    app.post("/dash", function (req, res) {
        res.send(datos(req.body.data))
    })
}
module.exports.RGET = RGET;
module.exports.RPOST = RPOST;
function datos(dato){
    switch(dato){
        case "1": 
        var a = [1,2,3,4,5];
        return a;
        case "2": 
        var b = [6,7,8,9,0];
        return b;
        case "3": 
        var c = {lab:["a","b","c","d","e"],valor:[4,5,6,7,8]};
        return c;
    }
}